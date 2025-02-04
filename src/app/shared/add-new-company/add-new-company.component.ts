import { Component, EventEmitter, Output } from '@angular/core';

import { AddFormBaseFuneralCompanyComponent } from '../bases/add-form-base-funeral-company.component';

@Component({
  selector: 'shared-add-new-company',
  standalone: true,
  imports: [],
  templateUrl: './add-new-company.component.html',
  styleUrl: './add-new-company.component.css',
})
export class AddNewCompanyComponent extends AddFormBaseFuneralCompanyComponent {
  @Output() onClose = new EventEmitter<void>();

  protected override _onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  protected override _handleClose(): void {
    this.onClose.emit();
  }
}
