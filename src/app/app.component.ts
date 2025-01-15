import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ErrorService } from 'services/error.service';
import { AuthService } from 'services/auth.service';
import { ErrorModalComponent } from './ui/modal/error-modal/error-modal.component';
import { HeaderComponent } from './shared/header/header.component';
import { ROLE_KEY } from '@lib/consts';
import { ERoles, ERoutes } from '@lib/enums';
import { app } from '@lib/staticTexts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ErrorModalComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected _texts = app;

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _errorService: ErrorService = inject(ErrorService);

  error = this._errorService.error;

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
