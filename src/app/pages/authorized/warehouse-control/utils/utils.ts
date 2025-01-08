import { formatDate } from '@angular/common';

import { INITIAL_PURCHASED_STATE, MONTH_NAMES, STATIC_CATEGORY_ITEM } from './consts';
import type { TNewItemArgs, TStatisticsItem } from './warehouse-control.gateway.model';
import type { TNewItemForm, TInitialMonthDetail } from './warehouse-control.model';

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

/* #region Statistics */

export function getStatisticsDate(): string {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, 'yyyy-MM', 'cs-CZ');

  return formattedDate;
}

export function getCurrentMonthName(): string {
  const date = new Date();

  return MONTH_NAMES[date.getMonth()];
}

export function getTotalMonthCategoryStats(statistics: TStatisticsItem[]): number[] {
  if (!statistics) {
    return [];
  }

  const getStats: number[] = statistics.reduce(([inStock, purchased, sold], typeStats) => {
    inStock += typeStats.inStock;
    purchased += typeStats.purchased;
    sold += typeStats.sold;

    return [inStock, purchased, sold];
  }, [0, 0, 0]);

  return getStats;
}

export function detailMonthStats(statistics: TStatisticsItem[]): TInitialMonthDetail {
  if (!statistics) {
    return structuredClone(INITIAL_PURCHASED_STATE);
  }

  const initialStateClone = structuredClone(INITIAL_PURCHASED_STATE);

  const purchasedStats = statistics.reduce((acc, statsType) => {
    if (!statsType.type || !statsType.purchased) {
      return acc;
    }

    acc.inStock.type.push(statsType.type);
    acc.inStock.data.push(statsType.inStock);

    acc.purchased.type.push(statsType.type);
    acc.purchased.data.push(statsType.purchased);

    acc.sold.type.push(statsType.type);
    acc.sold.data.push(statsType.sold);

    return acc;
  }, initialStateClone as TInitialMonthDetail);

  return purchasedStats;
}

/* #endregion */
