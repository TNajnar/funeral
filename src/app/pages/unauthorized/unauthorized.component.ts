import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from 'services/auth.service';
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';
import { ERoles, ERoutes } from '@lib/enums';
import { loginTexts } from '@lib/staticTexts';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ButtonSecondaryComponent],
  templateUrl: './unauthorized.component.html',
  host: {
    class: 'flex flex-col justify-center items-center h-dvh',
  },
})
export class UnauthorizedComponent {
  protected _texts = loginTexts;

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  protected _onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    this._authService.loginUser(ERoles.Authorized);

    formData.reset();

    this._router.navigate([`/${ERoutes.Warehouse}`]);
  }
}
