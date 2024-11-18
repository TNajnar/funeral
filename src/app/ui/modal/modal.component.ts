import { AfterViewInit, Component, ElementRef, input, output, viewChild, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements AfterViewInit {
  title = input<string>('');

  onClose = output<void>();

  private _dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor(private overlayContainer: OverlayContainer) {}

  ngAfterViewInit(): void {
    const containerElement = this.overlayContainer.getContainerElement();

    const dialogElement = this._dialogEl()?.nativeElement;
    if (dialogElement && containerElement) {
      dialogElement.appendChild(containerElement);
    }

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
