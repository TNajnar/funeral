export type TWarehouseItem = {
  availableCount: number;
  comment?: string;
  date: string;
  id: number;
  isFlagged: boolean;
  name: string;
  tabType: ETabVariants;
}

export interface IDialogData {
  coffinType: string;
  date: string;
  name: string;
  outcome: number;
  profit: number;
}

export type TFilterOptions = {
  hasComment: boolean;
  isFlagged: boolean;
  searchText: string,
  tabType: ETabVariants;
}

export type TTableTab = {
  id: number;
  text: string;
  variant: ETabVariants;
}

export enum ETabVariants {
  All = 'all',
  Coffin = 'coffin',
  Urns = 'urns',
  Flowers = 'flowers',
}
