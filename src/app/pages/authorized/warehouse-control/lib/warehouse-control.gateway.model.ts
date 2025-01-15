/* #region Warehouse items */

export type TWarehouseItems = {
  products: TWarehouseItem[];
};

export type TWarehouseItem = {
  comment?: string;
  inStock: number;
  isFlagged: boolean;
  name: string;
  producer?: string;
  productCategory: string;
  productCategoryId: number;
  productId: number;
  productMovements?: TProductMovement[];
  type: string;
};

type TProductMovement = {
  sold: number;
  purchased: number;
};

export type TNewItemArgs = {
  created: string;
  inStock: number;
  isFlagged: boolean;
  name: string;
  productCategoryId: number;
  type: string;
};

/* #endregion */

/* #region Categories */

export type TCategories = {
  productCategories: TCategory[];
};

export type TCategory = {
  id: number;
  name: string;
};

/* #endregion */

/* #region Statistics (Graph) */

export type TStatistics = {
  category: string;
  statistics: TStatisticsItem[];
};

export type TStatisticsItem = {
  type: string;
  purchased: number;
  sold: number;
  inStock: number;
  products: TProductStatistics[];
};

type TProductStatistics = {
  name: string;
  purchased: number;
  sold: number;
  inStock: number;
};

/* #endregion */
