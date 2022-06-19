import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, } from './http.service';
@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    constructor(private http: HttpService) { }

    // createTransaction(playload: any) {
    //     return this.http.post(
    //         `/api/v1/backoffice/transactions/outgoing-transactions`, playload);
    // }

    // preTransaction(playload: any) {
    //     return this.http.post(
    //         `/api/v1/backoffice/transactions/outgoing-transactions/pre-transfer`, playload);
    // }

    // confirmTransaction(playload: any) {
    //     return this.http.post(
    //         `/api/v1/backoffice/transactions/outgoing-transactions/confirm-transfer`, playload);
    // }

    createUser(playload: any) {
        return this.http.post(
            `/api/v1/backoffice/app-users`, playload);
    }

    getUsers(page_size: number, page: number, filterParams: any): Observable<any> {
        return this.http.get(
            `/api/v1/backoffice/app-users?page=${page + 1}&size=${page_size}`, filterParams);
    }

    getUserById(id:number) {
        return this.http.get(
            `/api/v1/backoffice/app-users/${id}`);
    }

    updateUserInfo(id:number, playload: any) {
        return this.http.put(
            `/api/v1/backoffice/app-users/${id}`, playload);
    }

    updatePassword(id:number, playload: any) {
        return this.http.put(
            `/api/v1/backoffice/app-users/${id}/update-password`, playload);
    }

    removeRole(id:number, playload: any) {
        return this.http.put(
            `/api/v1/backoffice/app-users/${id}/remove-role`, playload);
    }

    assignRole(id:number, playload: any) {
        return this.http.put(
            `/api/v1/backoffice/app-users/${id}/assign-role`, playload);
    }

    getRoles(){
        return this.http.get(
            `/api/v1/backoffice/app-roles`);
    }

    getGroupPositions(){
        return this.http.get(
            `/api/v1/backoffice/app-options/group-positions`);
    }
    // getPurposes() {
    //     return this.http.get(
    //         `/api/v1/backoffice/transaction-purposes`);
    // }
    
}
