import { Injectable } from '@angular/core';

import { ETabVariants } from '../utils/enums';
import type { TFilterOptions  } from '../utils/warehouse-control.model';
import type { TWarehouseItem } from '../utils/warehouse-control.gateway.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseTableFiltersService {
  filterOptions: TFilterOptions = {
    hasComment: false,
    isFlagged: false,
    searchText: '',
    productCategory: ETabVariants.All,
  };

  _createFilterPredicate(): (warehouseItem: TWarehouseItem, filter: string) => boolean {
    return (warehouseItem: TWarehouseItem, filter: string): boolean => {
      const parsedFilter = JSON.parse(filter);

      // Text filter
      const searchText = parsedFilter.searchText || '';
      const matchesSearchText =
        !searchText ||
        Object.values(warehouseItem).some((value) =>
          value?.toString().toLowerCase().includes(searchText)
        );

      // Toggle filters (e.g. isFlagged and hasComment)
      const matchesFlag = !parsedFilter.isFlagged || warehouseItem.isFlagged === parsedFilter.isFlagged;
      const matchesComment = !parsedFilter.hasComment || !!warehouseItem.comment === parsedFilter.hasComment;

      // Filter based on select tab
      const matchesTabType = parsedFilter.productCategory === ETabVariants.All ||
        warehouseItem.productCategory === parsedFilter.productCategory;

      // Return true if all matches
      return matchesSearchText && matchesFlag && matchesComment && matchesTabType;
    };
  }
}
