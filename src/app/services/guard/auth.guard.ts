import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorage } from 'src/app/models/session-storage.enum';
import { UserRole } from 'src/app/models/user-role.enum';
import { AuthService } from '../auth.service';
import { SessionStorageService } from '../session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private service: AuthService,
        private sessionStorage: SessionStorageService,
        private auth: AuthService,
    ) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {


      const roleBinder = {
        ADMIN: false,
        TELLER: false,
        TELLER_MANAGER: false,
        CCD_MAKER: false,
        CCD_CHECKER: false,
      };
      let roles: any;
      let isValidRole = false;
      // @ts-ignore
      roles = JSON.parse(this.sessionStorage.get(SessionStorage.roles));


      if (roles != null && roles.length > 0) {

        for (const role of roles) {

          // @ts-ignore
          roleBinder[role] = true;
        }
      }


      // for (const str of next.data['roles'].split(',')) {

      for (const str of Object.values(UserRole)) {
        
        // @ts-ignore
        if (roleBinder[str]) {
          isValidRole = true;
        }
      }
      
      // if (this.auth.hasLoggedIn() && isValidRole) {
      if (this.auth.hasLoggedIn()) {
        return true;
      } else {

        return this.router.parseUrl('/page-not-found');
      }

        return true;

    }
}
