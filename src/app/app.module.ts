import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTimepickerModule } from 'mat-timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralComponent } from './components/general/general.component';
import { MenuLeftComponent } from './components/general/menu-left/menu-left.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from './services';
import { AuthInterceptor } from './services/interception/auth.interceptor';
import { SettlementReportComponent } from './settlement-report/settlement-report.component';
import { DAY_MONTH_YEAR_FORMAT, TransactionReportComponent } from './transaction-report/transaction-report.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    GeneralComponent,
    MenuLeftComponent,
    NotFoundComponent,
    TransactionReportComponent,
    SettlementReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    HttpClientModule,

    // ### All Material Modules
    AngularMaterialModule,

    // ### Form
    FormsModule,
    ReactiveFormsModule,

    // ### Flex Layout
    FlexLayoutModule,
    MatDialogModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    // Toast
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NgbModule,

    // ### Loader Service
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MomentDateModule,
    NgxMaterialTimepickerModule,
    MatTimepickerModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DAY_MONTH_YEAR_FORMAT },
    // AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
