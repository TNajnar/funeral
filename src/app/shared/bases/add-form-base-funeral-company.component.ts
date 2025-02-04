import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'shared-add-form-base-funeral-company',
  template: '',
})
export abstract class AddFormBaseFuneralCompanyComponent {
  protected abstract _onSubmit(formData: NgForm): void;

  protected abstract _handleClose(): void;
}