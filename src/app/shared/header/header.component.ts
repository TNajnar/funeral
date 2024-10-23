import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERoutes } from '@lib/enums';

type THeaderItem = {
  id: number;
  routeName: string;
  url: ERoutes;
}

const headerItems: THeaderItem[] = [
  { id: 1, routeName: 'Sklad', url: ERoutes.Warehouse },
  { id: 2, routeName: 'Sjednávání', url: ERoutes.Negotiation },
  { id: 3, routeName: 'Kytice a hudba', url: ERoutes.BouquetAndMusic },
  { id: 4, routeName: 'Objednávka zahradníka', url: ERoutes.GardenerServices },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected _headerItems: THeaderItem[] = headerItems;
}
