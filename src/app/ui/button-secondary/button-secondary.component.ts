import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.css'
})
export class ButtonSecondaryComponent {
  @Input({ required: false }) disabled: boolean = false;
  @Input({ required: false }) type: string = 'button';
  @Input({ required: false }) fullWidth: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleOnClick(): void {
    this.onClick.emit();
  }
}
