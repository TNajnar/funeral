import { ETabVariants } from './enums';
import type { TNewItemArgs } from './warehouse-control.gateway.model';

export function resolveNewItemArgs(formData: TNewItemArgs, availableCount: number): TNewItemArgs {
  const formattedDate = formData.created ? new Date(formData.created) : new Date();

  return {
    created: formattedDate.toISOString(),
    productCategory: formData.productCategory || ETabVariants.All,
    name: formData.name,
    inStock: availableCount,
    isFlagged: false,
  };
}
