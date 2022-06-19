import { SessionStorageUtils } from './../../utils/session-storage-utils';
import { SessionStorage } from 'src/app/models/session-storage.enum';
import { LoaderService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from "../../services/session-storage.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  formModel = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  accessToken = false;

  constructor(
    private service: AuthService,
    private sessionStorageUtils: SessionStorageUtils,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService,
    public loaderService: LoaderService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("asd?>>>>")
    const accessToken: any = this.route.snapshot.queryParamMap.get('accessToken');

    if (accessToken) {
      this.service.loginAccessToken(accessToken).subscribe({
        complete: () => {
          this.redirectSuccessUrl();
        },
        error: (err) => {
          window.location.reload();
        },
        next: (data: any) => {
          localStorage.setItem('userInfo', JSON.stringify(data));
          localStorage.setItem('token', data.access_token);
        }
      })
    } else {
      this.accessToken = true;
    }
  }

  onLogin(): void {
    const body = new HttpParams()
      .set('username', this.formModel.value.username)
      .set('password', this.formModel.value.password)
      .set('grant_type', 'password')
      .set('client_id', 'olR0CK1FYkI70Tok35hqkgeD2sEvk9NmdoaY7Ob4')
      .set('client_secret', 'f6iHqsGHCWJQtRpq4WDuFJo31DEzWQkmV4nzd02nWfZMuGPBDZp0uTUWI8GNLombB6fOaYdZyo9xswwBVY4R3qcTcmS57NbN3T5GswfgYUIWd70JYs66XQThqxs0pX6T')
      ;

    this.service.login(body).subscribe({
      complete: () => {
        console.log("complete called");
        this.redirectSuccessUrl();
      },
      error: (err) => {
        console.log("err: ", err)
        this.loaderService.isLoading.next(false)
        if (err.status == 400) {
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        } else if (err.status == 401) {
          this.toastr.error(err?.error.message, err?.statusText);
        } else {
          console.log(err);
        }
      },
      next: (data: any) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('token', data.access_token);
        console.log("data", data);
      }
    })
  }

  redirectSuccessUrl(): void {
    // @ts-ignore
    // let roles: Array[String] = this.sessionStorageService.get(SessionStorage.roles);
    let redirectUrl = "/dashboard";
    // if (roles.includes("ADMIN")) {
    //   redirectUrl = "/dashboard"
    // }
    this.router.navigateByUrl(redirectUrl);
  }
}
