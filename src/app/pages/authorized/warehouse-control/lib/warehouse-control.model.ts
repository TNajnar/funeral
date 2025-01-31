import { TIconType } from '@app/ui/icon/icon.component';
import { ECategoryModalVariants } from './enums';

export interface IDialogData {
  coffinType: string;
  date: string;
  name: string;
  outcome: number;
  profit: number;
};

export type TFilterOptions = {
  hasComment: boolean;
  isFlagged: boolean;
  searchText: string,
  productCategory: string;
};

/* #region Categories */

export type TNewItemForm = {
  availableAmount: number;
  created: string;
  productCategory: number;
  name: string;
  isFlagged: boolean;
  type: string;
};

/* #endregion */

/* #region Categories */

export type TCategoryMenuItem = {
  icon: TIconType;
  id: number;
  name: string;
  variant: ECategoryModalVariants;
};

export type TCategoryModals = {
  [ECategoryModalVariants.EditOrRemoveCategory]: boolean;
  [ECategoryModalVariants.NewCategory]: boolean;
};

/* #endregion */

/* #region Statistics (Graph) */

export type TInitialMonthDetail = {
  inStock: TMonthDetailState;
  purchased: TMonthDetailState;
  sold: TMonthDetailState;
}

type TMonthDetailState = {
  type: string[]; data: number[];
}

/* #endregion */
