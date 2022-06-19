import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import {map, Observable} from "rxjs";
import {SettlementInfoApiModel} from "../../models/dashboard/settlement-info-api.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpService) { }
    private summaryResource = '/api/v1/backoffice/dashboard/summaries'
    private transDistributionResource = '/api/v1/backoffice/dashboard/transaction-distributions'
    private incomingTransResource = '/api/v1/backoffice/dashboard/top10-incoming-transactions'
    private outgoingTransResource = '/api/v1/backoffice/dashboard/top10-outgoing-transactions'
    private settlementInfoResource = '/api/v1/backoffice/dashboard/fast-account-inquiry-infos'

    getSummary() {
        return this.http.get(`${this.summaryResource}`)
    }

    getTransactionDistributions(params: any) {
      console.log("serviceParam", params);
        return this.http.get(`${this.transDistributionResource}`,params)
    }

    getLatestIncomingTrans() {
        return this.http.get(`${this.incomingTransResource}`)
    }

    getLatestOutgoingTrans() {
        return this.http.get(`${this.outgoingTransResource}`)
    }

    getSettlementInfo(){
       return this.http.get(`${this.settlementInfoResource}`)

    }
}
