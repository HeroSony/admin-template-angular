import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionReportRoutingModule } from './transaction-report-routing.module';
import { DAY_MONTH_YEAR_FORMAT, TransactionReportComponent } from './transaction-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    // TransactionReportComponent
  ],
  imports: [
    CommonModule,
    TransactionReportRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [
    // { provide: MAT_DATE_FORMATS, useValue: DAY_MONTH_YEAR_FORMAT }
  ]
})
export class TransactionReportModule { }
