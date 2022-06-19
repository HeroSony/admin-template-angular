import { Injectable } from '@angular/core';
import { HttpService, } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OutgoingTransactionService {

    constructor(private http: HttpService) { }

    getTransactions(page_size: number, page: number, filterParams: any): Observable<any> {
        return this.http.get(
            `/api/v1/backoffice/transactions/outgoing-transactions?page=${page + 1}&size=${page_size}`, filterParams);
    }

    getTransactionById(id: string) {
        return this.http.get(
            `/api/v1/backoffice/transactions/outgoing-transactions/${id}/`);
    }
    
    getOrginalTransaction(ref: string) {
        return this.http.get(
            `/api/v1/backoffice/transactions/original-outgoing-transactions/${ref}/`);
    }

    getParticipantBanks() {
        return this.http.get(
            `/api/v1/backoffice/participant-banks`);
    }

    resubmitTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/resubmit`, playload);
    }
    rejectTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/reject`, playload);
    }
    refundTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/outgoing-transactions/refund`, playload);
    }
    approveTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/approve`, playload);
    }
}
