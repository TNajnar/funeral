import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.css'
})
export class ButtonPrimaryComponent {
  @Input({ required: false }) disabled: boolean = false;
  @Input({ required: false }) type: string = 'button';
  @Input({ required: false }) fullWidth: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleOnClick(): void {
    this.onClick.emit();
  }
}
