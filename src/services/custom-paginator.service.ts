import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorService extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Položek na stránku';
  override nextPageLabel = 'Další stránka';
  override previousPageLabel = 'Předchozí stránka';
  override firstPageLabel = 'První stránka';
  override lastPageLabel = 'Poslední stránka';

  constructor() {
    super();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const start = page * pageSize + 1;
    const end = Math.min(start + pageSize - 1, length);
    return `${start}–${end} z ${length}`;
  };
}
