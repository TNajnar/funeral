import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/authorized/dashboard/dashboard.component';
import { NegotiationComponent } from './pages/authorized/negotiation/negotiation.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { WarehouseControlComponent } from './pages/authorized/warehouse-control/warehouse-control.component';
import { PlanningComponent } from './pages/authorized/planning/planning.component';
import { hasRoleGuard } from '@lib/has-role.guard';
import { ERoles, ERoutes } from '@lib/enums';

export const routes: Routes = [
  { path: ERoutes.Auth, component: UnauthorizedComponent },
  { path: '', redirectTo: ERoutes.Dashboard, pathMatch: 'full' },
  {
    path: ERoutes.Dashboard,
    component: DashboardComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ ERoles.Authorized ],
    },
  },
  {
    path: ERoutes.Warehouse,
    component: WarehouseControlComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ ERoles.Authorized ],
    },
  },
  {
    path: ERoutes.Negotiation,
    component: NegotiationComponent,
    canActivate: [hasRoleGuard],
    data: { roles: [ ERoles.Authorized ] }
  },
  {
    path: ERoutes.Planning,
    component: PlanningComponent,
    canActivate: [hasRoleGuard],
    data: { roles: [ ERoles.Authorized ] }
  },

  // { path: '**', component: NotFoundComponent } TODO Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
