import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTimepickerModule } from 'mat-timepicker';
import { AngularMaterialModule } from '../angular-material.module';
import { ClusterManagementRoutingModule } from './cluster-management-routing.module';
import { ClusterManagementComponent } from './cluster-management.component';
import { ClusterDetailDialog } from './shared/dialog/detail/cluster-detail.dialog.component';
import { CLusterFormDialog } from './shared/dialog/form/cluster-form.dialog.component';

@NgModule({
  declarations: [
    ClusterManagementComponent,
    ClusterDetailDialog,
    CLusterFormDialog
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    ClusterManagementRoutingModule,
    MatTimepickerModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClusterManagementModule { }

