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

export type TCategoryMenuItem = {
  icon: string;
  id: number;
  name: string;
  variant: ECategoryModalVariants;
};

export type TCategoryModals = {
  [ECategoryModalVariants.EditOrRemoveCategory]: boolean;
  [ECategoryModalVariants.NewCategory]: boolean;
};

export type TNewItemForm = {
  availableAmount: number;
  created: string;
  productCategory: number;
  name: string;
  isFlagged: boolean;
  type: string;
};
