import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BouquetMusicComponent } from './pages/authorized/bouquet-music/bouquet-music.component';
import { GardenerServicesComponent } from './pages/authorized/gardener-services/gardener-services.component';
import { NegotiationComponent } from './pages/authorized/negotiation/negotiation.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { WarehouseControlComponent } from './pages/authorized/warehouse-control/warehouse-control.component';
import {
  WarehouseItemDetailComponent,
} from '@pages/authorized/warehouse-control/warehouse-item-detail/warehouse-item-detail.component';
import { hasRoleGuard } from '@lib/has-role.guard';
import { ERoles, ERoutes } from '@lib/enums';

export const routes: Routes = [
  { path: ERoutes.Auth, component: UnauthorizedComponent },
  { path: '', redirectTo: ERoutes.Warehouse, pathMatch: 'full' },
  {
    path: ERoutes.Warehouse,
    component: WarehouseControlComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [ ERoles.Authorized ],
    },
  },
  {
    path: 'item/:id',
    component: WarehouseItemDetailComponent,
  },
  {
    path: ERoutes.BouquetAndMusic,
    component: BouquetMusicComponent,
    canActivate: [hasRoleGuard],
    data: { roles: [ ERoles.Authorized ]}
  },
  {
    path: ERoutes.GardenerServices,
    component: GardenerServicesComponent,
    canActivate: [hasRoleGuard],
    data: { roles: [ ERoles.Authorized ] }
  },
  {
    path: ERoutes.Negotiation,
    component: NegotiationComponent,
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
