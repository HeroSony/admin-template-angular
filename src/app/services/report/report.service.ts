import {Injectable} from '@angular/core';
import {HttpService} from './../http.service';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpService) { }
    private transactionReportResource = '/api/v1/backoffice/reports/transaction-histories';
    private downloadReportResource = '/api/v1/backoffice/reports/transaction-histories/download'
    private getSettlementReportResource = '/api/v1/backoffice/reports/settlement-histories';
    private downloadSettlementResource = '/api/v1/backoffice/reports/settlement-histories/download'

    getTransactionReport(params: any) {

        console.log("serviceParam", params);

        return this.http.get(`${this.transactionReportResource}`, params)

    }



    downloadTransactinReport(params: any) {
        return this.http.getBlob(`${this.downloadReportResource}`, params)

    }

    getSettlementReport(params: any) {

        console.log("serviceParam", params);

        return this.http.get(`${this.getSettlementReportResource}`, params)

    }

    downloadSettlementReport(params: any) {
        return this.http.getBlob(`${this.downloadSettlementResource}`, { params })

    }




}
