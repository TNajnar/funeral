import { Injectable } from '@angular/core';

import { ETabVariants } from '../warehouse-control.model';
import type { TFilterOptions, TWarehouseItem  } from '../warehouse-control.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseTableFiltersService {
  filterOptions: TFilterOptions = {
    hasComment: false,
    isFlagged: false,
    searchText: '',
    tabType: ETabVariants.All,
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
      const matchesTabType = parsedFilter.tabType === ETabVariants.All ||
        warehouseItem.tabType === parsedFilter.tabType;

      // Return true if all matches
      return matchesSearchText && matchesFlag && matchesComment && matchesTabType;
    };
  }
}
