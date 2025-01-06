import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-amount-tab-base-template',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './amount-tab-base-template.component.html',
})
export class AmountTabBaseTemplateComponent {
  protected _texts = warehouseControl.table.amountMenu;

  @Input({ required: true }) productAmount?: number;
  @Output() handleOnSubmit = new EventEmitter<void>();
  @Output() handleOnClose = new EventEmitter<void>();

  handleSubmit(): void {
    this.handleOnSubmit.emit();
  }

  handleClose(): void {
    this.handleOnClose.emit();
  }
}
