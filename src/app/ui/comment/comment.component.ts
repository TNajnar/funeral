import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ModalComponent } from '../modal/modal.component';
import { ButtonSecondaryComponent } from '../button-secondary/button-secondary.component';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';
import { commentComponent } from '@lib/staticTexts';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ModalComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonSecondaryComponent,
    ButtonPrimaryComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input({ required: true }) comment?: string;

  protected _texts = commentComponent;
  protected _isModalOpen = signal<boolean>(false);
  protected _localComment?: string;

  constructor() {
    if (!!this.comment) {
      this._localComment = this.comment;
    }
  }

  get hasComment(): boolean {
    return !!this._localComment;
  }

  protected _toggleModal(): void {
    this._isModalOpen.set(!this._isModalOpen());
  }

  protected _onSubmitComment(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }
    this._localComment = formData.value.comment;
    this._toggleModal();
  }
}
