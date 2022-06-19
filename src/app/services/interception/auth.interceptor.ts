import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService, private router: Router) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);

        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.isLoading.next(true);

        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });

            this.requests.push(clonedReq);

            return Observable.create((observer: any) => {
                const subscription = next.handle(clonedReq).pipe(
                    tap(
                        succ => { },
                        err => {
                            if (err.status == 401) {
                                localStorage.removeItem('token');
                                this.router.navigateByUrl('/login');
                            }
                            else if (err.status == 403)
                                this.router.navigateByUrl('/forbidden');
                        }
                    )
                )
                    .subscribe(
                        event => {
                            if (event instanceof HttpResponse) {
                                this.removeRequest(clonedReq);
                                observer.next(event);
                            }
                        },
                        err => { this.removeRequest(clonedReq); observer.error(err); },
                        () => { this.removeRequest(clonedReq); observer.complete(); });
                // teardown logic in case of cancelled requests
                return () => {
                    this.removeRequest(clonedReq);
                    subscription.unsubscribe();
                };
            });
        }
        else {
            this.router.navigateByUrl('/login');
            return next.handle(req.clone());
        }
    }
}


// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { tap } from "rxjs/operators";
// import { Router } from "@angular/router";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     constructor(private router: Router) {

//     }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (localStorage.getItem('token') != null) {
//             const clonedReq = req.clone({
//                 headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
//             });
//             return next.handle(clonedReq).pipe(
//                 tap(
//                     succ => { },
//                     err => {
//                         if (err.status == 401) {
//                             localStorage.removeItem('token');
//                             this.router.navigateByUrl('/login');
//                         }
//                         else if (err.status == 403)
//                             this.router.navigateByUrl('/forbidden');
//                     }
//                 )
//             )
//         }
//         else
//             return next.handle(req.clone());
//     }
// }