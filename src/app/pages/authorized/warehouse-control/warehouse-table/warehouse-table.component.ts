import { AfterViewInit, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { WarehouseTableService } from '../services/warehouse-table.service';
import { CustomPaginatorService } from 'services/custom-paginator.service';
import { FlagComponent } from '@app/ui/flag/flag.component';
import { CommentComponent } from '@app/ui/comment/comment.component';
import type { TFilterOptions, TWarehouseItem } from '../warehouse-control.model';
import { warehouseControl } from '@lib/staticTexts';

const _DISPLAYED_COLUMNS = ['id', 'date', 'name', 'availableCount', 'flag', 'comment', 'delete'];

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [FormsModule, FlagComponent, CommentComponent,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule,
  ],
  templateUrl: './warehouse-table.component.html',
  styleUrl: './warehouse-table.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorService }
  ],
  host: {
    class: 'flex flex-col overflow-hidden mb-14 min-h-[395px] border border-gray-muted rounded-md',
  }
})
export class WarehouseTableComponent implements AfterViewInit {
  protected _texts = warehouseControl.table;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
    const subscription = this._warehouseServiceTable.warehouseItems$.subscribe((warehouseItems) => {
      this.tableDataSource.data = warehouseItems;
    });

    this._destroyRef.onDestroy(() =>
      subscription.unsubscribe()
    );
  }

  get tableDataSource(): MatTableDataSource<TWarehouseItem, MatPaginator> {
    return this._warehouseServiceTable.tableDataSource;
  }

  private get _tableFilterOptions(): TFilterOptions {
    return this._warehouseServiceTable.filterOptions;
  }

  get displayedTableColumns(): string[] {
    return _DISPLAYED_COLUMNS;
  }

  onChangeToggle(value: boolean, type: string): void {
    if (type === 'Flag') {
      this._tableFilterOptions.isFlagged = value;
    } else if (type === 'Comment') {
      this._tableFilterOptions.hasComment = value;
    }

    this._warehouseServiceTable.updateTableFilters();
  }

  onFlagClick(itemId: number): void {
    this._warehouseServiceTable.toggleItemFlag(itemId);
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseServiceTable.deleteWarehouseItem(id);
  }
}
