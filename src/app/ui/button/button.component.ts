import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type TButtonVariant = 'primary' | 'secondary' | 'tertiary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() variant?: TButtonVariant = 'primary';
  @Input() disabled?: boolean = false;
  @Input() type?: string;

  @Output() onClick = new EventEmitter<void>();

  handleOnClick(): void {
    this.onClick.emit();
  }
}

