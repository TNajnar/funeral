import { Component } from '@angular/core';

import { AddFormBaseFuneralCompanyComponent } from '../bases/add-form-base-funeral-company.component';

@Component({
  selector: 'shared-add-new-funeral',
  standalone: true,
  imports: [],
  templateUrl: './add-new-funeral.component.html',
  styleUrl: './add-new-funeral.component.css',
})
export class AddNewFuneralComponent extends AddFormBaseFuneralCompanyComponent {
  protected override _onSubmit(): void {
    console.log('Method not implemented.');
  }

  protected override _handleClose(): void {
    console.log('Method not implemented.');
  }
}
