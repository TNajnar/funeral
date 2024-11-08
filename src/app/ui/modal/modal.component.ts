import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Inject, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, NgIf, NgTemplateOutlet],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Output() onConfirm = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contentTemplate: TemplateRef<any> }
  ) {}

  protected _onClose(): void {
    this.dialogRef.close();
  }

  protected _onConfirm(): void {
    this.onConfirm.emit();
    this.dialogRef.close();
  }
}
