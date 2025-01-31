import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ErrorService } from 'services/error.service';
import { ModalComponent } from '../modal.component';
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';
import { modalComponent } from '@lib/staticTexts';

@Component({
  selector: 'ui-error-modal',
  standalone: true,
  imports: [ModalComponent, MatButtonModule, ButtonSecondaryComponent],
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {
  texts = modalComponent;
  title = input<string>('');
  message = input<string>();

  private _errorService: ErrorService = inject(ErrorService);

  onClearError(): void {
    this._errorService.clearError();
  }
}
