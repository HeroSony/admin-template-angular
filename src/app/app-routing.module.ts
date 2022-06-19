import { LoginGuard } from './services/guard/login.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { GeneralComponent } from './components/general/general.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/guard/auth.guard';
import { ClusterManagementComponent } from './cluster-management/cluster-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: GeneralComponent,
    canActivate: [AuthGuard],
    data: {
      roles: 'ADMIN'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
      }
    ]
  },
  {
    path: '',
    component: GeneralComponent,
    canActivate: [AuthGuard],
    data: {
      roles: 'ADMIN'
    },
    children: [
      {
        path: 'cluster-management',
        loadChildren: () => import('./cluster-management/cluster-management.module').then(mod => mod.ClusterManagementModule)
      }
    ]
  },
  
  {
    path: 'login',
    component: LogInComponent,
    // canActivate: [LoginGuard],
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent,

  },
  {
    path: '**', redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
