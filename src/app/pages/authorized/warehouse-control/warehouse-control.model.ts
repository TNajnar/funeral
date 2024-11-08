export type TWarehouseItem = {
  id: number;
  date: string;
  coffinType: string;
  name: string;
  profit: number;
  outcome: number;
}

export interface IDialogData {
  date: string;
  coffinType: string;
  name: string;
  profit: number;
  outcome: number;
}
