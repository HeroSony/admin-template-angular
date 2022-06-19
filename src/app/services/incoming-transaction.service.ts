import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService, } from './http.service';
import { environment } from '../../environments/environment';
import { TransactionApi } from '../models/incoming-transaction/transaction-api.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IncomingTransactionService {

    // base_url: string = environment.base_url;

    // base_url: string = `http://134.209.107.118:17777/api/v1`;

    constructor(private http: HttpService) { }

    getTransactions(page_size: number, page: number, filterParams: any): Observable<any> {
        return this.http.get(
            `/api/v1/backoffice/transactions/incoming-transactions?page=${page + 1}&size=${page_size}`, filterParams);
    }

    // getTransactions(page_size: number, page: number, filterParams: string) {
    //     return this.http.get(
    //         `/api/v1/backoffice/transactions/incoming-transactions?page=${page + 1}&size=${page_size}`, JSON.stringify(filterParams));
    // }

    getTransactionById(id: string) {
        return this.http.get(
            `/api/v1/backoffice/transactions/incoming-transactions/${id}/`);
    }
    
    getOrginalTransaction(ref: string) {
        return this.http.get(
            `/api/v1/backoffice/transactions/original-incoming-transactions/${ref}/`);
    }


    getParticipantBanks() {
        return this.http.get(
            `/api/v1/backoffice/participant-banks`);
    }

    acknowledgeTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/approve`, playload);
    }
    refundTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/incoming-transactions/refund`, playload);
    }
    reversalTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/incoming-transactions/reversal`, playload);
    }
    repostTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/repost`, playload);
    }

    

    preTransactionReversal(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/reversal-transactions/pre-transfer`, playload);
    }

    confirmTransactionReversal(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/reversal-transactions/confirm-transfer`, playload);
    }

    reversalTransactionReversal(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/reversal-transactions`, playload);
    }

}
