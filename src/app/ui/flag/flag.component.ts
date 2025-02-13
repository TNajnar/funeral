import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-flag',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.css'
})
export class FlagComponent {
  @Input({ required: false }) isFlagged: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  protected _handleClickFlag(): void {
    this.onClick.emit();
  }
}
