import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AddFormBaseFuneralCompanyComponent } from '../bases/add-form-base-funeral-company.component';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import { formButtonsTemplate } from '@lib/staticTexts';

@Component({
  selector: 'shared-add-new-funeral',
  standalone: true,
  imports: [FormsModule, ButtonPrimaryComponent, ButtonSecondaryComponent,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  ],
  templateUrl: './add-new-funeral.component.html',
})
export class AddNewFuneralComponent extends AddFormBaseFuneralCompanyComponent {
  protected _texts = formButtonsTemplate;

  @Output() onClose = new EventEmitter<void>();

  protected override _onSubmit(formData: NgForm): void {
    console.log('formData:', formData);
  }

  protected override _handleClose(): void {
    this.onClose.emit();
  }
}
