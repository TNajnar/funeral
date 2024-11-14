import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/header/header.component';
import { AuthService } from 'services/auth.service';
import { ROLE_KEY } from '@lib/consts';
import { ERoles, ERoutes } from '@lib/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  constructor() {
    const isAuthRoleStored = window.localStorage.getItem(ROLE_KEY);

    if (isAuthRoleStored) {
      const transformedRole: ERoles = isAuthRoleStored as ERoles;
      this._authService.loginUser(transformedRole);
      return;
    };

    this._router.navigate([`/${ERoutes.Auth}`]);
  }

  get isAuthorized(): boolean {
    return this._authService.getUserRole === ERoles.Authorized;
  }
}
