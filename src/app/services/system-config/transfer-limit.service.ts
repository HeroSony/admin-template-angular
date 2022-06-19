import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class TransferLimitService {

    constructor(private http: HttpService) { }
    private resource = '/api/v1/backoffice/system-configurations/transfer-limit-mgt';

    get(params: any) {
        return this.http.get(`${this.resource}`, params);
    }

    put(resource: string, data: any) {
        console.log("resource: ", resource)
        console.log("data: ", data)
        return this.http.put(`${this.resource}${resource}`, data);
    }
}
