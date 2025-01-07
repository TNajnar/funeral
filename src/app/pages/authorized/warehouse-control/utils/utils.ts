import { formatDate } from '@angular/common';

import { MONTH_NAMES, STATIC_CATEGORY_ITEM } from './consts';
import type { TNewItemArgs } from './warehouse-control.gateway.model';
import type { TNewItemForm } from './warehouse-control.model';

export function resolveNewItemArgs(formData: TNewItemForm): TNewItemArgs {
  const formattedDate = formData.created ? new Date(formData.created) : new Date();

  return {
    created: formattedDate.toISOString(),
    productCategoryId: formData.productCategory || STATIC_CATEGORY_ITEM.id,
    name: formData.name,
    inStock: formData.availableAmount,
    isFlagged: false,
    type: formData.type
  };
}

export function getStatisticsDate(): string {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, 'yyyy-MM', 'cs-CZ');

  return formattedDate;
}

export function getCurrentMonthName(): string {
  const date = new Date();

  return MONTH_NAMES[date.getMonth()];
}
