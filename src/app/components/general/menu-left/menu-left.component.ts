import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SessionStorageService} from '../../../services/session-storage.service';
// import { SessionStorage } from '../../models/session-storage.enum';
import {DefaultLangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SessionStorage} from 'src/app/models/session-storage.enum';
import {UserRole} from 'src/app/models/user-role.enum';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
  animations: [
    trigger('subItem', [
      state('void', style({opacity: 0, transform: 'translateX(-50px)'})),
      transition('void => *', animate('.2s ease'))
    ])
  ]
})
export class MenuLeftComponent implements OnInit {
  @Input('hideText') public hideText = false;
  @Input('phone') public phone = false;
  @Input('hideMenuBar') public hideMenuBar = false;
  @Output() valueChange = new EventEmitter();

  private tempMenuItems: MenuItem[] = [];

  // Array object that we use.
  displayMenuItems: MenuItem[] = [];
  isFirstLoaded = false;

  constructor(private sessionStorage: SessionStorageService, private translate: TranslateService) {
    this.doRenderMenu();
  }

  ngOnInit() {
    this.displayMenuItems = this.traverseMenuItems(this.tempMenuItems);
    this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      if (this.isFirstLoaded) {
        this.doRenderMenu();
        this.displayMenuItems = this.traverseMenuItems(this.tempMenuItems);
      }
    });
    this.isFirstLoaded = true;
  }

  doRenderMenu() {
    this.tempMenuItems = [
      {
        index: 1,
        title: "Dashboard",
        routerLink: '/dashboard',
        icon: 'supervised_user_circle',
      },
      {
        index: 2,
        title: "Cluster Management",
        routerLink: '/cluster-management',
        icon: 'settings',
      },
      {
        index: 3,
        title: "Adminstrator Log",
        routerLink: '/system-configuration/participant-bank2',
        icon: 'settings',
      },
      {
        index: 4,
        title: "Lottery History",
        routerLink: '/system-configuration/participant-bank3',
        icon: 'settings',
      },
    ],

    this.tempMenuItems = this.tempMenuItems.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })

    this.tempMenuItems = this.tempMenuItems.sort((a, b) => (a.index > b.index) ? 1 : -1)

  }


  /**
   * Expand when click on item which has children
   * @param item
   */
  menuClick(item: MenuItem) {
    if (!item.routerLink) {
      item.expanded = !item.expanded;
    }
  }

  hideNavBar() {
    this.hideMenuBar = true;
    this.valueChange.emit(this.hideMenuBar);
  }

  /**
   * Filter menu to be displayed
   * @param menuItems
   */
  private traverseMenuItems(menuItems: MenuItem[]) {
    return menuItems.filter(item => {
      if (item.children) {
        item.children = this.traverseMenuItems(item.children);
      }
      return true;
    });
  }
}

export interface MenuItem {
  index: number;
  title: string; // Title to be displayed
  exact?: boolean; // Highlight when active or not
  routerLink?: string; // Link to redirect when click
  children?: MenuItem[]; // Children of the menu
  roles?: string[]; // Allowed roles for the menu
  icon?: string; // Icon to be displayed
  expanded?: boolean; // Show children or not
  isSectionTitle?: boolean;
}