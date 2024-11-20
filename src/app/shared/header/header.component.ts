import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from 'services/auth.service';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { ERoutes } from '@lib/enums';

type THeaderItem = {
  id: number;
  routeName: string;
  url: ERoutes;
}

const headerItems: THeaderItem[] = [
  { id: 1, routeName: 'Nástěnka', url: ERoutes.Dashboard },
  { id: 2, routeName: 'Sklad', url: ERoutes.Warehouse },
  { id: 3, routeName: 'Sjednávání', url: ERoutes.Negotiation },
  { id: 4, routeName: 'Kytice a hudba', url: ERoutes.BouquetAndMusic },
  { id: 5, routeName: 'Objednávka zahradníka', url: ERoutes.GardenerServices },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ButtonPrimaryComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  protected _headerItems: THeaderItem[] = headerItems;

  protected _authService: AuthService = inject(AuthService);
}
