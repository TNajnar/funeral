export type TWarehouseItems = {
  products: TWarehouseItem[];
}

export type TWarehouseItem = {
  comment?: string;
  created: string;
  inStock: number;
  isFlagged: boolean;
  name: string;
  producer?: string;
  producerId?: number;
  productCategory: string;
  productCategoryId?: number;
  productId: number;
  productMovements?: TProductMovement[];
}

type TProductMovement = {
  created: string;
  productMovementType: TProductMovementType;
  oldState: number;
  requested: number;
  newState: number;
}

type TProductMovementType = 'PURCHASE' | 'SALE';

export type TNewItemArgs = {
  created: string;
  productCategory: string;
  name: string;
  inStock: number;
  isFlagged: boolean;
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
  productCategory: ETabVariants;
}

export type TTableTab = {
  id: number;
  text: string;
  variant: ETabVariants;
}

export enum ETabVariants {
  All = 'All',
  Coffin = 'Coffins',
  Urns = 'Urns',
  Flowers = 'Flowers',
}
