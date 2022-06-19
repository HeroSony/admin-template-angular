import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    readonly BaseURI = environment.api_url;


    // /oauth/token?username=admin&password=admin
    private token = sessionStorage.getItem("token");

    constructor(
        private http: HttpClient
    ) { }

    public get(resource: string, options?: any,) {
        return this.http.get(`${this.BaseURI}${resource}`, {
            params: options,
            headers: { "Authorization": "Bearer " + this.token }
        });
    }
    public post(resource: string, data: any, options?: any) {
        return this.http.post(`${this.BaseURI}${resource}`, data, options);
        // return this.http.post(`${this.BaseURI}${resource}`, data, {params: options, headers: {"Authorization": "Bearer " + this.token}});
    }
    public put(resource: string, data: any, options?: any) {
        console.log("data: ", data)
        return this.http.put(`${this.BaseURI}${resource}`, data, {
            params: options,
            headers: { "Authorization": "Bearer " + this.token }
        });
    }
    public delete(resource: string, options?: any) {
        return this.http.delete(`${this.BaseURI}${resource}`, {
            params: options,
            headers: { "Authorization": "Bearer " + this.token }
        });
    }


    public getBlob(resource: string, options?: any,): Observable<HttpResponse<Blob>> {

        return this.http.get<Blob>(`${this.BaseURI}${resource}`, {
            params: options, headers: { "Authorization": "Bearer " + this.token },
            observe: 'response',
            responseType: 'blob' as 'json'
        });
    }

    // public getBlob(resource: string, options?: any,) {
    //     return this.http.get<Blob>(`${this.BaseURI}${resource}`, {
    //         params: options, headers: { "Authorization": "Bearer " + this.token },
    //         observe: 'response',
    //         responseType: 'blob' as 'json'
    //     }).subscribe(response => {
    //         console.log("RESPONSE HEADER", response.headers);

    //         /* Get filename from Content-Disposition header */
    //         var filename = response.headers.get('filename');
    //         var disposition = response.headers.get('Content-Disposition');
    //         // if (disposition && disposition.indexOf('attachment') !== -1) {
    //         //     var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    //         //     var matches = filenameRegex.exec(disposition);
    //         //     if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
    //         // }
    //         // This does the trick
    //         var a = document.createElement('a');
    //         a.href = window.URL.createObjectURL(response.body!);
    //         a.download = filename!;
    //         a.dispatchEvent(new MouseEvent('click'));
    //     });
    // }




}
