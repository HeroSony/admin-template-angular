import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from '../components/general/general.component';
import { AuthGuard } from '../services/guard/auth.guard';
import { SettlementReportComponent } from './settlement-report.component';

const routes: Routes = [{
  path: '',
  component: SettlementReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettlementReportRoutingModule { }
