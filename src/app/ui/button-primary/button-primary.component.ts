import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type TVariants = 'base' | 'extended';

@Component({
  selector: 'ui-button-primary',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.css',
})
export class ButtonPrimaryComponent {
  protected _variant!: TVariants;

  @Input({ required: false }) disabled: boolean = false;
  @Input({ required: false }) type: string = 'button';
  @Input({ required: false }) fullWidth: boolean = false;

  @Input({ required: false }) set variant(variant: TVariants) {
    this._variant = variant;
  }

  @Output() onClick = new EventEmitter<void>();

  handleOnClick(): void {
    this.onClick.emit();
  }
}
