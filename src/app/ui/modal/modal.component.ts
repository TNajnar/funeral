import { AfterViewInit, Component, ElementRef, output, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements AfterViewInit {
  onClose = output<void>();

  private _dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  ngAfterViewInit(): void {
    this._dialogEl().nativeElement.showModal();
    this._dialogEl().nativeElement.focus();
  }

  protected _onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.onClose.emit();
      this._dialogEl().nativeElement.close();
    }
  };
}
