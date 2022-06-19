import { SessionStorage } from 'src/app/models/session-storage.enum';
import { SessionStorageService } from './session-storage.service';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs';
import { SessionStorageUtils } from '../utils/session-storage-utils';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        // private fb: FormBuilder,
        private sessionStorageService: SessionStorageService,
        private sessionStorageUtils: SessionStorageUtils,
        private http: HttpClient) { }
        readonly BaseURI = environment.token_url;

    // formModel = this.fb.group({
    //     username: ['', Validators.required],
    //     Email: ['', Validators.email],
    //     FullName: [''],
    //     Passwords: this.fb.group({
    //         Password: ['', [Validators.required, Validators.minLength(4)]],
    //         ConfirmPassword: ['', Validators.required]
    //     }, { validator: this.comparePasswords })

    // });

    // comparePasswords(fb: FormGroup) {
    //     let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //     //passwordMismatch
    //     //confirmPswrdCtrl.errors={passwordMismatch:true}
    //     if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
    //         if (fb.get('Password').value != confirmPswrdCtrl.value)
    //             confirmPswrdCtrl.setErrors({ passwordMismatch: true });
    //         else
    //             confirmPswrdCtrl.setErrors(null);
    //     }
    // }

    // register() {
    //     var body = {
    //         UserName: this.formModel.value.UserName,
    //         Email: this.formModel.value.Email,
    //         FullName: this.formModel.value.FullName,
    //         Password: this.formModel.value.Passwords.Password
    //     };
    //     return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
    // }

    login(formData: any) {
        console.log("formData: ", formData)
        return this.http.post(`${this.BaseURI}/o/token/`, formData).pipe(
            map((response: any) => {
                return this.sessionStorageUtils.saveResponseToSessionStorage(response);
            })
        );;
    }

    loginAccessToken(token: string) {
        return this.http.post(`${this.BaseURI}/oauth/paygate-token?accessToken=${token}`, {}).pipe(
            map((response: any) => {
                return this.sessionStorageUtils.saveResponseToSessionStorage(response);
            })
        );;
    }

    public hasLoggedIn(): boolean {
        return !!this.sessionStorageService.get(SessionStorage.token);
    }
    // getUserProfile() {
    //     return this.http.get(this.BaseURI + '/UserProfile');
    // }

    // roleMatch(allowedRoles): boolean {
    //     var isMatch = false;
    //     var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    //     var userRole = payLoad.role;
    //     allowedRoles.forEach(element => {
    //         if (userRole == element) {
    //             isMatch = true;
    //             return false;
    //         }
    //     });
    //     return isMatch;
    // }
}


// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';

// // @Injectable({
// //     providedIn: 'root'
// // })
// // export class AuthService {
// //     private url = 'http://134.209.107.118:19999/oauth/token';

// //     // /oauth/token?username=admin&password=admin

// //     constructor(
// //         private http: HttpClient
// //     ) { }

// //     public login(options?: any) {
// //         return this.http.get(`${this.url}`, options);
// //     }

// // }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { HttpService } from './http.service'

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthService {
//     private url = '/oauth/token';

//     // /oauth/token?username=admin&password=admin

//     constructor(
//         private http: HttpService
//     ) { }

//     public login(options: any) {
//         console.log("options: ", options)
//         return this.http.post(`${this.url}`, options);
//     }

// }
