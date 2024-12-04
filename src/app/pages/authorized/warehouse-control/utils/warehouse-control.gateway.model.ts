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
  newState: number;
  oldState: number;
  productMovementType: TProductMovementType;
  requested: number;
}

type TProductMovementType = 'PURCHASE' | 'SALE';

export type TNewItemArgs = {
  created: string;
  inStock: number;
  isFlagged: boolean;
  name: string;
  productCategory: string;
}

export type TCategories = {
  productCategories: TCategory[];
}

export type TCategory = {
  id: number;
  name: string;
}
