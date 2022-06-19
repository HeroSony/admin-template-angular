import { Injectable } from '@angular/core';
import { HttpService, } from './http.service';
@Injectable({
    providedIn: 'root'
})
export class T24CustomerAccount {

    constructor(private http: HttpService) { }

    getInfo(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/amk/apim/customer-account-infos`, playload);
    }
}
