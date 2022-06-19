import { TransactionReportModel, TransactionType, ChannelType, Status, CurrencyType, FormatType } from './../models/report/index';
import { HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { LoaderService } from '../services';
import { ReportService } from '../services/report/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-settlement-report',
  templateUrl: './settlement-report.component.html',
  styleUrls: ['./settlement-report.component.css']
})

export class SettlementReportComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    // 'id',
    // 'createdAt',
    'dateTime',
    'totalIncomingAmount',
    'bankName',
    'currency',
    'totalIncomingCommissionBankMember',
    'totalIncomingTransaction',
    'totalNetAmount',
    'totalNetFee',
    'totalOutgoingAmount',
    'totalOutgoingCommissionBankMember',
    'totalOutgoingCommissionNbc',
    'totalOutgoingFee',
    'totalOutgoingTransaction',
    // 'status',
    // 'fastSettlementType',
  ];
  dataSource = new MatTableDataSource<TransactionReportModel>([]);

  formSettlementModel: FormGroup = new FormGroup({});
  currencyType: CurrencyType[] = [
    { id: 0, name: 'ALL', value: "ALL" },
    { id: 1, name: 'KHR', value: "KHR" },
    { id: 2, name: 'THB', value: "THB" },
    { id: 3, name: 'USD', value: "USD" },
  ];

  transactionType: TransactionType[] = [
    { id: "0", name: 'ALL', value: "ALL" },
    { id: "1", name: 'FAST Incoming', value: "FAST_INCOMING" },
    { id: "2", name: 'FAST Outgoing', value: "FAST_OUTGOING" },

  ];

  transactionMainType: TransactionType[] = [
    { id: "0", name: 'ALL', value: "ALL" },
    { id: "1", name: 'INWARD_TRANSFER', value: "INWARD_TRANSFER" },
    { id: "2", name: 'OUTWARD_TRANSFER', value: "OUTWARD_TRANSFER" },

  ];

  channelType: ChannelType[] = [
    { id: "1", name: "OTC", value: "OTC" },
    { id: "2", name: "MB", value: "MB" },
    { id: "3", name: "AGENT", value: "AGENT" },
    { id: "4", name: "NBC_F0001", value: "NBC_F0001" },
  ]

  statusType: Status[] = [
    { id: "0", name: "ALL", value: "ALL" },
    { id: "1", name: "SUCCESS", value: "SUCCESS" },
    { id: "2", name: "FAILED", value: "FAILED" },
    { id: "3", name: "REVERSAL", value: "REVERSAL" },
    { id: "4", name: "PENDING", value: "PENDING" },
  ]


  // FILTERS
  startDate!: Date;
  startTime!: Date;
  endDate!: Date;
  endTime!: Date;
  selectedCurrency: string = "ALL";
  selectedTransactionType: string = "ALL";
  selectedTransactionMainType: string = "ALL";
  status: string = "ALL";
  // ### Pagination
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize!: number;
  totalCount: number = 0;
  totalPage!: number;

  minValue: Date;
  maxValue: Date;
  // defaultValue: Date;
  @ViewChild('t1') matTimepicker!: HTMLFormElement;
  @ViewChild('t2') matTimepicker2!: HTMLFormElement;

  constructor(private service: ReportService, private fb: FormBuilder,
    public loaderService: LoaderService) {
    const minValue = new Date();
    // minValue.setHours(6);
    // minValue.setMinutes(10);
    this.minValue = minValue;

    const maxValue = new Date();
    // maxValue.setHours(18);
    // maxValue.setMinutes(10);
    this.maxValue = maxValue;
    const startTime = new Date();
    startTime.setHours(0);
    startTime.setMinutes(0);
    this.startTime = startTime;

    const endTime = new Date();
    endTime.setHours(23);
    endTime.setMinutes(59);
    this.endTime = endTime;


    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit(): void {

    this.formSettlementModel = this.fb.group({
      startDate: ['', Validators.nullValidator],
      startTime: [this.startTime, Validators.nullValidator],

      endDate: ['', Validators.nullValidator],
      endTime: [this.endTime, Validators.nullValidator],

      currencyType: [this.selectedCurrency, Validators.required],
      statusType: [this.status, Validators.required],
      transactionType: [this.selectedTransactionType, Validators.required],
      // transactionMainType: [this.selectedTransactionMainType, Validators.required],
    });

    this._list();
  }

  onGenerateReport(form: FormGroup): void {
    if (form.valid) {
      this._list();
    }
  }

  private _list(): void {
    let page = this.pageIndex + 1;
    const params = {
      page,
      size: this.pageSize,
      ...(this.selectedCurrency != "ALL" && { currency: this.selectedCurrency }),
      ...(this.endDate && { endDate: moment(this.endDate).format('YYYY-MM-DD') + 'T' + (moment(this.endTime).format('HH:mm') || "") }),
      ...(this.startDate && { startDate: moment(this.startDate).format('YYYY-MM-DD') + 'T' + (moment(this.startTime).format('HH:mm') || "") }),
      ...(this.selectedTransactionType != "ALL" && { transactionType: this.selectedTransactionType }),
      // ...(this.selectedTransactionMainType != "ALL" && { transactionMainType: this.selectedTransactionMainType }),

      ...(this.status != "ALL" && { status: this.status })
    }


    this.service.getSettlementReport(JSON.parse(JSON.stringify(params))).subscribe({
      complete: () => {
        // console.log("complete");
      },
      error: () => { console.log("error"); },    // errorHandler
      next: (val: any) => {
        // console.log("next", val);
        const { data, pagination } = val;

        // console.log("getSettlementReport",data, pagination)

        this.dataSource = new MatTableDataSource<TransactionReportModel>(data);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 500);

        this.pageIndex = pagination.page - 1;
        this.pageSize = pagination.size;
        this.totalCount = pagination.total_counts;
        this.totalPage = pagination.total_pages;

      },     // nextHandler
    })


  }

  public handlePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this._list();

    return event;
  }

  exportReport(type: string): void {


    let page = this.pageIndex + 1;
    const params = {
      currency: this.selectedCurrency,
      page,
      size: this.pageSize
    }

    this.service.downloadSettlementReport(params)
      .subscribe(

        (resp: HttpResponse<any>) => {
          // console.log("filename", resp.headers);
          const data = resp.body!
          // console.log("data", data);
          const objectUrl = URL.createObjectURL(data)
          const a = document.createElement('a')

          let today = new Date().toLocaleDateString()
          a.href = objectUrl
          a.download = `SETTLEMENT_REPORT_${today}.xls`
          a.click();
          URL.revokeObjectURL(objectUrl);
        });

  }

  resetForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.formSettlementModel.reset();
  }


}



