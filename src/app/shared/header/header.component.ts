import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from 'services/auth.service';
import { IconComponent } from '@app/ui/icon/icon.component';
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
  { id: 4, routeName: 'Plánování', url: ERoutes.Planning },
];

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [RouterModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  protected _headerItems: THeaderItem[] = headerItems;

  protected _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  onLogoClick(): void {
    this._router.navigate([`/${ERoutes.Dashboard}`]);
  }
}
