import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
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
  selector: 'ui-comment',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ModalComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonSecondaryComponent,
    ButtonPrimaryComponent,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input() comment?: string;
  @Output() onSaveComment = new EventEmitter<string | undefined>();

  protected _texts = commentComponent;
  protected _isModalOpen = signal<boolean>(false);
  protected _localComment?: string;
  protected _isPristine: boolean = true;

  ngOnInit(): void {
    if (this.comment) {
      this._localComment = this.comment;
    }
  }

  get hasComment(): boolean {
    return !!this._localComment;
  }

  protected _toggleModal(): void {
    this._isModalOpen.set(!this._isModalOpen());
  }

  protected _onChangedComment(input: string): void {
    if (input === this._localComment) {
      return;
    }

    this._isPristine = false;
  }

  protected _onSubmitComment(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    this._localComment = formData.value.comment;

    this.onSaveComment.emit(this._localComment);
    this._isPristine = true;
    this._toggleModal();
  }
}
