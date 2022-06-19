import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule


  ],
  providers:[DatePipe]
})
export class DashboardModule { }


