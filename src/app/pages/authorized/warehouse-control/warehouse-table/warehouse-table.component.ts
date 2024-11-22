import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { WarehouseService } from '../warehouse.service';
import { CustomPaginatorService } from 'services/custom-paginator.service';
import { FlagComponent } from '@app/ui/flag/flag.component';
import { CommentComponent } from '@app/ui/comment/comment.component';
import type { TWarehouseItem } from '../warehouse-control.model';
import { warehouseControl } from '@lib/staticTexts';

const _DISPLAYED_COLUMNS = ['id', 'date', 'name', 'availableCount', 'flag', 'comment', 'delete'];

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [FlagComponent, CommentComponent, MatIconModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule],
  templateUrl: './warehouse-table.component.html',
  styleUrl: './warehouse-table.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorService }
  ],
  host: {
    class: 'overflow-hidden mb-14 border border-gray-muted rounded-md',
  }
})
export class WarehouseTableComponent {
  protected _texts = warehouseControl.table;

  protected _dataSource = new MatTableDataSource<TWarehouseItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected _warehouseService: WarehouseService = inject(WarehouseService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

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

  onFlagClick(itemId: number): void {
    this._warehouseService.toggleItemFlag(itemId);
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseService.deleteWarehouseItem(id);
  }
}
