import { Injectable } from '@angular/core';
import { HttpService, } from './http.service';
@Injectable({
    providedIn: 'root'
})
export class AccountBaseTransferService {

    constructor(private http: HttpService) { }

    createTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/outgoing-transactions`, playload);
    }

    preTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/outgoing-transactions/pre-transfer`, playload);
    }

    confirmTransaction(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/transactions/outgoing-transactions/confirm-transfer`, playload);
    }

    getParticipantBanks() {
        return this.http.get(
            `/api/v1/backoffice/participant-banks`);
    }

    getPurposes() {
        return this.http.get(
            `/api/v1/backoffice/transaction-purposes`);
    }
    
}
