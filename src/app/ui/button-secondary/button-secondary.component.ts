import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type TVariants = 'base' | 'extended';

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.css'
})
export class ButtonSecondaryComponent {
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
