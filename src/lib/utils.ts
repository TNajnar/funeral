import { MONTH_NAMES } from './consts';

export function getCurrentMonthName(): string {
  const date = new Date();

  return MONTH_NAMES[date.getMonth()];
}