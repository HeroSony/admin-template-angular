import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    constructor(private http: HttpClient, private loadingService: LoadingService) {
    }

    postJSON(url: string, data: any = {}) {
        this.clean(data);
        this.loadingService.setLoading(true);
        const headers = new HttpHeaders({
            Authorization: 'Basic TU9DX0JVU19SRUdfU0VSVkVSX0NMSUVOVDpwYXNzd29yZA==',
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(url, data, { headers });
    }

    patchJSON(url: string, data: any = {}) {
        this.clean(data);
        this.loadingService.setLoading(true);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.patch(url, data, { headers });
    }


    post(url: string, data: any = {}) {
        this.clean(data);
        this.loadingService.setLoading(true);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, data, { headers });
    }

    getJSON(url: string, data: any = {}) {
        this.clean(data);
        this.loadingService.setLoading(true);
        return this.http.get(url, { params: data });
    }

    clean(obj: any) {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }
}
