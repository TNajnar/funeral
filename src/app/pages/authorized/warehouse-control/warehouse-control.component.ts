import { AfterViewInit, Component, DestroyRef, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

import { AuthService } from 'services/auth.service';
import { WarehouseService } from './warehouse.service';
import { CustomPaginatorService } from 'services/custom-paginator.service';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewWarehouseItemComponent } from './add-new-warehouse-item/add-new-warehouse-item.component';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { FlagComponent } from '@app/ui/flag/flag.component';
import { CommentComponent } from '@app/ui/comment/comment.component';
import type { TWarehouseItem } from './warehouse-control.model';
import { warehouseControl } from '@lib/staticTexts';

const _DISPLAYED_COLUMNS = ['id', 'date', 'name', 'availableCount', 'flag', 'comment', 'delete'];

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [AsyncPipe, AddNewWarehouseItemComponent, ModalComponent, ButtonPrimaryComponent, FlagComponent, CommentComponent, MatIconModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './warehouse-control.component.html',
  styleUrls: ['./warehouse-control.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorService }
  ],
  host: {
    class: 'flex flex-col',
  },
})
export class WarehouseControlComponent implements AfterViewInit {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);

  protected _authService: AuthService = inject(AuthService);
  protected _warehouseService: WarehouseService = inject(WarehouseService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  protected _dataSource = new MatTableDataSource<TWarehouseItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this._dataSource.paginator = this.paginator;
    const subscription = this._warehouseService.warehouseItems$.subscribe((warehouseItems) =>{
      this._dataSource.data = warehouseItems;

    });

    this._destroyRef.onDestroy(() =>
      subscription.unsubscribe()
    );
  }

  get displayedTableColumns(): string[] {
    return _DISPLAYED_COLUMNS;
  }

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onFlagClick(itemId: number): void {
    this._warehouseService.toggleItemFlag(itemId);
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseService.deleteWarehouseItem(id);
  }
}
