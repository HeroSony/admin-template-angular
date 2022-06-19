import {
  ChannelType,
  CurrencyType,
  FormatType,
  Status,
  TransactionReportModel,
  TransactionType
} from './../models/report/index';
import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LoaderService} from '../services';
import {ReportService} from '../services/report/report.service';
import * as moment from 'moment';
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {
  @ViewChild('t1') matTimepicker!: HTMLFormElement;
  @ViewChild('t2') matTimepicker2!: HTMLFormElement;
  myDatePickerFrom = new Date();
  myDatePickerTo = new Date();

  formReportFilterModel: FormGroup = new FormGroup({});
  formTranModel: FormGroup = new FormGroup({});
  formSettlementModel: FormGroup = new FormGroup({});


  cols: number | undefined;

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }
  displayedColumns: string[] = [
    'id',
    'createdAt',
    'transactionRefNo',
    'fastTransactionRefNo',
    'transactionFt',
    'senderBank',
    'senderAccountNumber',
    'branchCode',
    'terminalId',
    'receiverBank',
    'receiverAccountNumber',
    'transactionStatus',
    'transactionMainType',
    'amount',
    'currency'

  ];
  dataSource = new MatTableDataSource<TransactionReportModel>([]);


  currencyType: CurrencyType[] = [
    { id: 0, name: 'ALL', value: "ALL" },
    { id: 1, name: 'KHR', value: "KHR" },
    { id: 2, name: 'THB', value: "THB" },
    { id: 3, name: 'USD', value: "USD" },
  ];

  formatType: FormatType[] = [
    { id: 1, name: 'Excel', value: 'XLS' },
    { id: 2, name: 'PDF', value: 'PDF' },

  ]
  transactionType: TransactionType[] = [
    { id: "0", name: 'ALL', value: "ALL" },
    { id: "1", name: 'Auto Incoming Trans', value: "AUTO_INCOMING_TRAN" },
    { id: "2", name: 'Auto Outgoing Trans', value: "AUTO_OUTGOING_TRAN" },
    { id: "3", name: 'Credit Adjustment Trans', value: "CREDIT_ADJ_TRAN" },
    { id: "4", name: 'Debit Adjustment Trans', value: "DEBIT_ADJ_TRAN" },
    { id: "5", name: 'Incoming Trans', value: "INCOMING_TRAN" },
    { id: "6", name: 'Outgoging Trans', value: "OUTGOING_TRAN" },
    { id: "7", name: 'Repost Trans', value: "REPOST_TRAN" },
    { id: "8", name: 'Resubmit Trans', value: "RESUBMIT_TRAN" },
  ];

  transactionMainType: TransactionType[]=[
    { id: "0", name: 'ALL', value: "ALL" },
    { id: "0", name: 'INWARD_TRANSFER', value: "INWARD_TRANSFER" },
    { id: "0", name: 'OUTWARD_TRANSFER', value: "OUTWARD_TRANSFER" },
  ]



  channelType: ChannelType[] = [
    { id: "0", name: "ALL", value: "ALL" },
    { id: "1", name: "OTC", value: "OTC" },
    { id: "2", name: "MB", value: "MB" },
    { id: "3", name: "AGENT", value: "AGENT" },
    { id: "4", name: "NBCF0001", value: "NBCF0001" },
  ]

  statusType: Status[] = [
    { id: "0", name: "ALL", value: "ALL" },
    { id: "1", name: "SUCCESS", value: "SUCCESS" },
    { id: "2", name: "FAILED", value: "FAILED" },
    { id: "3", name: "REPOSTED", value: "REPOSTED" },
    { id: "4", name: "RESUBMITTED", value: "RESUBMITTED" },
  ]


  // ### Pagination
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize!: number;
  totalCount: number = 0;
  totalPage!: number;
  // Filter
  selectedCurrency: string = "ALL";
  selectedChannel: string = "ALL";
  selectedTransactionType = "ALL";
  selectedTransactionMainType = "ALL";
  status: string = "ALL"

  customerAccountOrCardNumber!: string;
  startDate!: Date;
  startTime!: Date;
  endDate!: Date;
  endTime!: Date;
  fastTransactionNumber!: string;


  t24TransactionNumber!: string
  terminalId!: string;
  transactionNumber!: string

  filter = {
    fastTransactionType: ""
  }

  // public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(private service: ReportService, private fb: FormBuilder,
    public loaderService: LoaderService,private _liveAnnouncer: LiveAnnouncer) {

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


  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.formTranModel = this.fb.group({
      transNumber: ['', Validators.nullValidator],
      ftTransNumber: ['', Validators.nullValidator],
      fastTransNumber: ['', Validators.nullValidator],
      terminalId: ['', Validators.nullValidator],
      customerId: ['', Validators.nullValidator],
      startDate: ['', Validators.nullValidator],
      startTime: [this.startTime, Validators.nullValidator],
      endDate: ['', Validators.nullValidator],
      endTime: [this.endTime, Validators.nullValidator],
      currencyType: [this.selectedCurrency, Validators.required],
      transactionType: [this.selectedTransactionType, Validators.required],
      transactionMainType: [this.selectedTransactionMainType, Validators.required],
      channelType: [this.selectedChannel, Validators.required],
      status: [this.status, Validators.required],
    })

    this._list();
  }
  resetForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.formTranModel.reset();


  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onDateChange(date: any) {
    // console.log("date", date)
  }

  onGenerateReport(form: FormGroup): void {
    if (form.valid) {
      this._list();
    }
  }

  exportReport(type: string): void {
    let page = this.pageIndex + 1;
    const params = {
      customerAccountOrCardNumber: this.customerAccountOrCardNumber,
      fastTransactionNumber: this.fastTransactionNumber,
      t24TransactionNumber: this.t24TransactionNumber,
      terminalId: this.terminalId,
      transactionNumber: this.transactionNumber,
      ...(this.selectedCurrency != "ALL" && { currency: this.selectedCurrency}),
      ...(this.endDate && { endDate: moment(this.endDate).format('YYYY-MM-DD') + 'T' + (moment(this.endTime).format('HH:mm') || "") }),
      ...(this.startDate && { startDate: moment(this.startDate).format('YYYY-MM-DD') + 'T' + (moment(this.startTime).format('HH:mm') || "") }),
      ...(this.status != "ALL" && { status: this.status }),
      ...(this.selectedTransactionType != "ALL" && { transactionType: this.selectedTransactionType }),
      ...(this.selectedTransactionMainType != "ALL" && { transactionMainType: this.selectedTransactionMainType }),
      ...(this.selectedChannel != "ALL" && { channel: this.selectedChannel }),
    }

    this.service.downloadTransactinReport(JSON.parse(JSON.stringify(params)))
      .subscribe(
        (resp: HttpResponse<any>) => {
          // console.log("filename", resp.headers);
          const data = resp.body!
          const objectUrl = URL.createObjectURL(data)
          const a = document.createElement('a')
          a.href = objectUrl
          let today = new Date().toLocaleDateString()
          a.download = `TRANSACTION_HISTORIES_REPORT_${today}.xls`;
          a.click();
          URL.revokeObjectURL(objectUrl);
        });

  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;

  }

  private _list(): void {

    let page = this.pageIndex + 1;
    // console.log("DATE", moment(this.startDate).format('yyyy-MM-dd HH:mm'));

    const params = {
      page,
      size: this.pageSize,
      customerAccountOrCardNumber: this.customerAccountOrCardNumber,
      fastTransactionNumber: this.fastTransactionNumber,
      t24TransactionNumber: this.t24TransactionNumber,
      terminalId: this.terminalId,
      transactionNumber: this.transactionNumber,
      ...(this.selectedCurrency != "ALL" && { currency: this.selectedCurrency}),
      ...(this.endDate && { endDate: moment(this.endDate).format('YYYY-MM-DD') + 'T' + (moment(this.endTime).format('HH:mm') || "") }),
      ...(this.startDate && { startDate: moment(this.startDate).format('YYYY-MM-DD') + 'T' + (moment(this.startTime).format('HH:mm') || "") }),
      ...(this.status != "ALL" && { status: this.status }),
      ...(this.selectedTransactionType != "ALL" && { transactionType: this.selectedTransactionType }),
      ...(this.selectedTransactionMainType != "ALL" && { transactionMainType: this.selectedTransactionMainType }),
      ...(this.selectedChannel != "ALL" && { channel: this.selectedChannel }),

    }

    // console.log("PARAMS", params)

    this.service.getTransactionReport(JSON.parse(JSON.stringify(params))).subscribe({
      complete: () => {
      },
      error: () => { console.log("error"); },    // errorHandler
      next: (val: any) => {
        const { data, pagination } = val;

        this.dataSource = new MatTableDataSource<TransactionReportModel>(data);
        // console.log("DS=>", data)

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

}



export const DAY_MONTH_YEAR_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
