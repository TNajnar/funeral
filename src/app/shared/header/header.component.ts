import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERoutes } from '@lib/enums';

type THeaderItem = {
  id: number;
  routerName: string;
  url: ERoutes;
}

const headerItems: THeaderItem[] = [
  { id: 1, routerName: 'Warehouse', url: ERoutes.Warehouse },
  { id: 2, routerName: 'Negotiation', url: ERoutes.Negotiation },
  { id: 3, routerName: 'Bouquet and Music', url: ERoutes.BouquetAndMusic },
  { id: 4, routerName: 'Gardener Services', url: ERoutes.GardenerServices },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected _headerItems = headerItems;
}
