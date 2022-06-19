import { AuthService } from 'src/app/services/auth.service';
import { SessionStorage } from 'src/app/models/session-storage.enum';
import { SessionStorageService } from './../session-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private auth: AuthService,
        private sessionStorage: SessionStorageService,
        private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const defaultURLBinder = {
            ADMIN: '/account-base-transfer',
            TELLER: '/teller',
            TELLER_MANAGER: '/teller_manager'
        };

        // todo add auth back
        if (this.auth.hasLoggedIn()) {
          console.log("canActivate","IF")
            const role = JSON.parse(this.sessionStorage.get(SessionStorage.roles) || '[]');
            // @ts-ignore
          return !this.router.navigate([defaultURLBinder[role[0]]]);
            // return true;
        } else {
          console.log("canActivate","ELSE")
            return false;
        }

        return true;

    }
}
