import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementReportRoutingModule } from './settlement-report-routing.module';
import { SettlementReportComponent } from './settlement-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from 'mat-timepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    declarations: [
        // SettlementReportComponent
    ],
    imports: [
        CommonModule,
        SettlementReportRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatTimepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule
    ],

})
export class SettlementReportModule { }