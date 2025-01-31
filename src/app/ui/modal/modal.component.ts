import { AfterViewInit, Component, ElementRef, input, OnDestroy, output, viewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [NgIf, MatIconModule, IconComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  title = input<string>('');
  private _overlayContainerElement!: HTMLElement;

  onClose = output<void>();

  private _dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor(private overlayContainer: OverlayContainer) {}

  ngAfterViewInit(): void {
    this._overlayContainerElement = this.overlayContainer.getContainerElement();

    const dialogElement = this._dialogEl()?.nativeElement;

    if (dialogElement && this._overlayContainerElement) {
      dialogElement.appendChild(this._overlayContainerElement);
    }

    document.body.classList['add']('modal-open');
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

  ngOnDestroy(): void {
    document.body.classList['remove']('modal-open');
    if (this._overlayContainerElement) {
      document.body.appendChild(this._overlayContainerElement);
    }
  }
}
