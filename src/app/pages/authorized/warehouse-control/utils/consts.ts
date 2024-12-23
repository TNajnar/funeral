import { ECategoryModalVariants } from './enums';
import type { TCategoryMenuItem } from './warehouse-control.model';

export const _DISPLAYED_COLUMNS = ['category', 'type', 'name', 'availableAmount', 'flag', 'comment', 'delete'];

export const _CATEGORY_COLUMNS = ['delete', 'category'];

export const CATEGORY_MENU_ITEMS: TCategoryMenuItem[] = [
  { id: 6, name: 'Přidat kategorii', icon: 'add', variant: ECategoryModalVariants.NewCategory },
  { id: 7, name: 'Editovat kategorie' , icon: 'edit', variant: ECategoryModalVariants.EditOrRemoveCategory },
];
