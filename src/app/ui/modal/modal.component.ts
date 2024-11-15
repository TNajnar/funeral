import { AfterViewInit, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements AfterViewInit {
  title = input<string>('');

  onClose = output<void>();

  private _dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  ngAfterViewInit(): void {
    this._dialogEl().nativeElement.showModal();
    this._dialogEl().nativeElement.focus();
  }

  protected _onClose = (): void => {
    this.onClose.emit();
    this._dialogEl().nativeElement.close();
  };

  protected _onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this._onClose();
    }
  };
}
