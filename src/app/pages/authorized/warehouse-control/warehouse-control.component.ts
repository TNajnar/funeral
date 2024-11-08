import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'services/auth.service';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewWarehouseItemComponent } from './add-new-warehouse-item/add-new-warehouse-item.component';
import type { TWarehouseItem } from './warehouse-control.model';
import { warehouse } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [MatButtonModule, AddNewWarehouseItemComponent],
  templateUrl: './warehouse-control.component.html',
  styleUrls: ['./warehouse-control.component.css'],
  host: {
    class: 'flex flex-col',
  },
})
export class WarehouseControlComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<ModalComponent>;

  protected _texts = warehouse;
  protected _warehouseItems: TWarehouseItem[] = []; // TODO data from API

  protected _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  readonly dialog: MatDialog = inject(MatDialog);

  addNewWareItem(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        contentTemplate: this.modalContent
      }
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.handleConfirm();
    });
  }

  handleConfirm(): void {
    console.log('Confirmed!');
  }

  onWarehouseItemClick(id: number): void {
    console.log(id);
    this._router.navigate([`/item/${id}`]);
  }
}
