import { ETabVariants, type TNewItemArgs } from '../warehouse-control.model';

export function resolveNewItemArgs(formData: TNewItemArgs, availableCount: number): TNewItemArgs {
  const formattedDate = formData.created ? new Date(formData.created) : new Date();

  return {
    created: formattedDate.toISOString(),
    productCategory: formData.productCategory || ETabVariants.All,
    name: formData.name,
    stockUp: availableCount,
    isFlagged: false,
  };
}
