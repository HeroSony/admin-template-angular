import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SessionStorage } from 'src/app/models/session-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DefaultLangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('transformIcon', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
      transition(
        'show => hide',
        animate(
          '.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            opacity: 0,
            transform: 'rotate(90deg) scale(0)'
          })
        )
      ),
      transition('hide => show', [
        style({ transform: 'rotate(-90deg)' }),
        animate(
          '.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            opacity: 1,
            transform: 'rotate(0)'
          })
        )
      ])
    ]),
    trigger('logoIcon', [
      state('show', style({ transform: 'translateX(10px)' })),
      state('hide', style({ transform: 'translateX(0)' })),
      transition('show <=> hide', animate('.2s cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class GeneralComponent implements OnInit {
  screenWidth: number;
  hideText = false;
  hideMenuBar = false;
  title = "Lottery Management System";

  frameVisibility = 'hidden';

  constructor(private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private translateConfigService: TranslateConfigService) {

    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

    if (this.screenWidth <= 767) {
      this.hideText = true;
    }
  }

  ngOnInit() {
    console.log("title:: ", this.title)
    let roles: any;
    // roles = JSON.parse(this.sessionStorageService.get(SessionStorage.roles));
    // this.getNavigationTitle(roles);
    // this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
    //   this.getNavigationTitle(roles);
    // });
  }

  getNavigationTitle(roles: any) {
    const elem: HTMLElement = document.getElementById('header-title-bar')!;
    elem.setAttribute('style', 'right: -155px');
    this.title = "Title"
    // for (const role of roles) {
    //   switch (role.name) {
    //     case 'ROLE_SUPERADMIN':
    //       this.translate.getDefaultLang() === 'km' ? elem.setAttribute('style', 'right: -220px') :
    //         elem.setAttribute('style', 'right: -150px');
    //       this.title = this.translate.instant('navigation_bar.admin_title');
    //       break;
    //     case 'ROLE_ACCOUNTANT':
    //       this.translate.getDefaultLang() === 'km' ? elem.setAttribute('style', 'right: -180px') :
    //         elem.setAttribute('style', 'right: -155px');
    //       this.title = this.translate.instant('navigation_bar.accounting_title');
    //       break;
    //     default:
    //       this.translate.getDefaultLang() === 'km' ? elem.setAttribute('style', 'right: -165px') :
    //         elem.setAttribute('style', 'right: -200px');
    //       this.title = this.translate.instant('navigation_bar.obr_title');
    //       break;
    //   }
    // }
  }

  onChangeLanguage(type: string) {
    this.translateConfigService.changeLanguage(type)
  }

  toggleNav() {
    this.hideText = !this.hideText;
  }

  onChangeProfile() {
    let profile: any;
    // profile = JSON.parse(this.sessionStorageService.get(SessionStorage.profile));
    this.router.navigateByUrl('/profile/' + profile.id).then();
  }

  onLogout() {
    this.sessionStorageService.delete(SessionStorage.token);
    this.sessionStorageService.delete(SessionStorage.token_type);
    this.sessionStorageService.delete(SessionStorage.refresh_token);
    this.sessionStorageService.delete(SessionStorage.roles);
    this.sessionStorageService.delete(SessionStorage.profile);
    this.router.navigateByUrl('').then();
  }

  getFullName() {
    let profile: any;
    profile = JSON.parse(this.sessionStorageService.get(SessionStorage.profile) || '{}');
    return profile.display_name;
  }

  openFrameLayout() {
    this.frameVisibility = 'visible';
  }

  onCloseFrame() {
    this.frameVisibility = 'hidden';
  }
}
