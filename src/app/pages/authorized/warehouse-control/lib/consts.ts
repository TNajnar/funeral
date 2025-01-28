import { ECategoryModalVariants } from './enums';
import type { TCategoryMenuItem, TInitialMonthDetail } from './warehouse-control.model';

export const _DISPLAYED_COLUMNS = ['category', 'type', 'name', 'availableAmount', 'flag', 'comment', 'delete'] as const;

export const _CATEGORY_COLUMNS = ['delete', 'category'] as const;

export const CATEGORY_MENU_ITEMS: TCategoryMenuItem[] = [
  { id: 6, name: 'Přidat kategorii', icon: 'add', variant: ECategoryModalVariants.NewCategory },
  { id: 7, name: 'Editovat kategorie' , icon: 'edit', variant: ECategoryModalVariants.EditOrRemoveCategory },
] as const;

export const STATIC_CATEGORY_ITEM = { id: 1, name: 'Vše' } as const;

export const INITIAL_PURCHASED_STATE: TInitialMonthDetail = {
  inStock: { type: [], data: [] },
  purchased: { type: [], data: [] },
  sold: { type: [], data: [] },
};

export const DEFAULT_PAGINATION_SIZE = 5 as const;
