import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';

import { CurrencyType, TransactionType, ChannelType } from './../models/report/index';
import { DashboardService } from './../services/dashboard/dashboard.service';
import { HttpService } from './../services/http.service';
import { HttpParams } from '@angular/common/http';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {LoaderService} from "../services";
import {DatePipe, formatDate} from "@angular/common";
import { SettlementInfoApiModel} from "../models/dashboard/settlement-info-api.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('channelContainer', { static: true }) channelContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  barChartData: any[] = [];
  lineChartData: any[] = [];
  numberData: any[] = []

  view: any[] = [];

  // line chart options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  // bar chart options

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  noLineChartData = false;

  //card
  cardColor: string = '#7c1d4e';
  //7c1d4e
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // cardBandColor: string = '#a8385d';
  numberColorScheme = {
    domain: ['#a8385d']
  }



  channelType: ChannelType[] = [
    { id: "0", name: "ALL", value: "ALL" },
    { id: "1", name: "OTC", value: "OTC" },
    { id: "2", name: "MB", value: "MB" },
    { id: "3", name: "AGENT", value: "AGENT" },
    { id: "4", name: "NBCF0001", value: "NBCF0001" },
  ]

  selectedChannel: string = "ALL";

  transactionType: TransactionType[] = [
    { id: "0", name: 'All', value: "ALL" },
    { id: "1", name: 'Auto Incoming Trans', value: "AUTO_INCOMING_TRAN" },
    { id: "2", name: 'Auto Outgoing Trans', value: "AUTO_OUTGOING_TRAN" },
    { id: "3", name: 'Credit Adjustment Trans', value: "CREDIT_ADJ_TRAN" },
    { id: "4", name: 'Debit Adjustment Trans', value: "DEBIT_ADJ_TRAN" },
    { id: "5", name: 'Incoming Trans', value: "INCOMING_TRAN" },
    { id: "6", name: 'Outgoging Trans', value: "OUTGOING_TRAN" },
    { id: "7", name: 'Repost Trans', value: "REPOST_TRAN" },
    { id: "8", name: 'Resubmit Trans', value: "RESUBMIT_TRAN" },


  ];
  selectedTransactionType!: string;

  currencyType: CurrencyType[] = [
    { id: 0, name: 'All', value: "ALL", selected: true },
    { id: 1, name: 'KHR', value: "KHR" },
    { id: 2, name: 'THB', value: "THB" },
    { id: 3, name: 'USD', value: "USD" },
  ];
  selectedCurrency: string = "ALL"


  // tables
  displayedColumns: string[] = ['id', 'transactionRefNo', 'createdAt', 'amount', 'currency', 'transactionStatus'];
  incomingDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  outgoingDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // ### Pagination
  pageEvent!: PageEvent;
  pageIndex!: number;
  pageSize!: number;
  totalCount!: number;
  totalPage!: number;

  // public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  form: FormGroup = new FormGroup({});

  currentDate:String = ""

  settlementInfo:SettlementInfoApiModel = new SettlementInfoApiModel({
    bizDate: new Date(),bizTime: new Date(), myBankId:"",settleUSD:0,settleKHR:0, nextSettleUSD:0,nextSettleKHR:0, nextSess:new Date()
  })


  constructor(private http: HttpService, private dashboardService: DashboardService,
    private fb: FormBuilder,public loaderService: LoaderService, private datePipe:DatePipe) {
    setInterval(() => {
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    }, 1000)


    this.form = fb.group({
      currency: [this.selectedCurrency, [Validators.required]],
      channel: [this.selectedChannel, [Validators.required]],

    })
    // Object.assign(this, { lineChartData });



  }

  onSelect(data: any): void {

  }

  onActivate(data: any): void {

  }

  onDeactivate(data: any): void {

  }

  onGenerateLineChart(): void {

    this.getTransactionDistribution();
  }

  ngOnInit(): void {
    this.getSettlementInfo()

    this.getTransactionDistribution();

    // temporarity not call because unauthorized issue
    // setTimeout(() =>{
    //   this.getDashboardSummaries();
    //   this.getLatestIncomingTrans();
    //   this.getLatestOutgoingTrans();
    // },500)

    this.getDashboardSummaries();
    this.getLatestIncomingTrans();
    this.getLatestOutgoingTrans();

    const params = new HttpParams()
      .set('currency', 'KHR')
      .set('page', 1)
      .set('size', 15);
  }

  ngAfterViewInit() {

  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;

  }


  valueFormatting(data: any) {
    // console.log("data", data);
    switch (data.label) {
      // case "Transactions made":
      //   return data.value + "%"
      default:
        return data.value
    }

  }

  getDashboardSummaries() {
    this.dashboardService.getSummary().subscribe(
      (res: any) => {
        const { data } = res;
        Object.assign(this, { numberData })
        this.numberData[0] = { name: "Total Transactions", value: data.totalTransactions }
        this.numberData[1] = { name: "Total Channels", value: data.totalChannels }
        this.numberData[2] = { name: "Total Accounts", value: data.totalAccounts }
        this.numberData[3] = { name: "Total Users", value: data.totalUsers }

      },
      err => {
        console.log(err);
      },
    )
  }

  getTransactionDistribution() {

    const params = {
      ...(this.selectedCurrency != "ALL" && { currency: this.selectedCurrency}),
      ...(this.selectedChannel != "ALL" && { channel: this.selectedChannel }),
    }

    console.log("PARAMS", params)
    this.dashboardService.getTransactionDistributions(JSON.parse(JSON.stringify(params))).subscribe(
      (res: any) => {

        // clear data before getting new data
        lineChartData = [];

        const { data } = res;
        const { transactionDistributions } = data



        transactionDistributions.map((item: any) => {
          // @ts-ignore
          lineChartData.push(item) // set data to lineChart array
        })



        lineChartData.map((item:any)=>{
          if(item.series.length > 0){
            // loop and clean up property to fit with graph
            for (let i = 0; i < item.series.length; i++) {
              // console.log("ITEM1", item.series[i]);
              item.series[i].value = item.series[i].numberOfTransactions
              item.series[i].name = item.series[i].transactionDate
              delete item.series[i].numberOfTransactions
              delete item.series[i].transactionDate
              delete item.series[i].totalAmount
            }
            // this.lineChartData.push(item)
            // Object.assign(this.lineChartData,item)
            Object.assign(this, { lineChartData });
            console.log("lineChartData=>",lineChartData)
            this.noLineChartData = false;
          }else{
           this.noLineChartData = true;
          }

        })

        // console.log("lineChartData=>", lineChartData)
      },
      err => {
        lineChartData = []
        this.noLineChartData = true;
      },
    )
  }

  getLatestIncomingTrans() {
    this.dashboardService.getLatestIncomingTrans().subscribe(
      (res: any) => {

        const { data } = res;
        // console.log("getLatestIncomingTrans=>", res)
        this.incomingDataSource.data = data

      },
      err => {
        console.log(err);
      },
    )

  }

  getLatestOutgoingTrans() {
    this.dashboardService.getLatestOutgoingTrans().subscribe(
      (res: any) => {

        const { data } = res;
        // console.log("getLatestOutgoingTrans=>", data)
        this.outgoingDataSource.data = data
        // this.iterator();

      },
      err => {
        console.log(err);
      },
    )

  }

  getSettlementInfo(){
    this.dashboardService.getSettlementInfo().subscribe(
      (res:any)=>{
        const {data} = res
        // this.settlementInfo.myBankId =  data.myBankId
        this.settlementInfo = data

      },
      err => {
        console.log("Error getting settlement Info", err)
      }
    )
  }
}





export interface PeriodicElement {
  transactionRefNo: string;
  createdAt: string;
  operationType: string;
  senderBank: string;
  senderAccountNumber: string;
  receiverBank: string;
  receiverAccountNumber: string;
  amount: string;
  currency: string;
  transactionStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

export var lineChartData = [
  // {
  //   "name": "Incoming Transactions",
  //   "series": [
  //     {
  //       "value": 4620,
  //       "name": "2016-09-23"
  //     },
  //     {
  //       "value": 3135,
  //       "name": "2016-09-24"
  //     },
  //     {
  //       "value": 4744,
  //       "name": "2016-09-18"
  //     },
  //     {
  //       "value": 6970,
  //       "name": "2016-09-13"
  //     },
  //     {
  //       "value": 3651,
  //       "name": "2016-09-16"
  //     }
  //   ]
  // },
  // {
  //   "name": "Outgoing Transactions",
  //   "series": [
  //     {
  //       "value": 3899,
  //       "name": "2016-09-23T"
  //     },
  //     {
  //       "value": 5474,
  //       "name": "2016-09-24T"
  //     },
  //     {
  //       "value": 2670,
  //       "name": "2016-09-18"
  //     },
  //     {
  //       "value": 4432,
  //       "name": "2016-09-13"
  //     },
  //     {
  //       "value": 4184,
  //       "name": "2016-09-16"
  //     }
  //   ]
  // },
];

export var barChartData = [
  {
    "name": "OTC",
    "value": 8940000
  },
  {
    "name": "MB",
    "value": 5000000
  },
  {
    "name": "AGENT",
    "value": 5000000
  },
  {
    "name": "NBC_F0001",
    "value": 5000000
  }
];


export var numberData = [
  // {
  //   "name": "Transactions made",
  //   "value": 30000
  // },
  // {
  //   "name": "Accounts",
  //   "value": 500
  // },
  // {
  //   "name": "Users",
  //   "value": 30
  // },
  // {
  //   "name": "Channels",
  //   "value": 5
  // }
];


