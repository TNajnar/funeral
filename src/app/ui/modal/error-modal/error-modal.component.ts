import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ErrorService } from 'services/error.service';
import { ModalComponent } from '../modal.component';
import { modalComponent } from '@lib/staticTexts';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [ModalComponent, MatButtonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css',
})
export class ErrorModalComponent {
  texts = modalComponent;
  title = input<string>();
  message = input<string>();

  private _errorService: ErrorService = inject(ErrorService);

  onClearError(): void {
    this._errorService.clearError();
  }
}
