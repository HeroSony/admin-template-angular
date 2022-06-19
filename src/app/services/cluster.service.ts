import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ClusterService {

    constructor(private http: HttpService) { }
    private resource = '/api/20220601/clusters';

    list(params: any) {
        console.log("params:", params)
        return this.http.get(`${this.resource}`, params);
    }

    get(id: number) {
        console.log("id:", id)
        return this.http.get(`${this.resource}/${id}`);
    }

    post(data: any) {
        return this.http.post(`${this.resource}`, data);
    }

    put(resource: string, data: any) {
        return this.http.put(`${this.resource}/${resource}`, data);
    }
}
