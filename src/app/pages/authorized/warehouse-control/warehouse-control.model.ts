export type TWarehouseItem = {
  coffinType: string;
  comment?: string;
  date: string;
  id: number;
  isFlagged: boolean;
  name: string;
  outcome: number;
  profit: number;
}

export interface IDialogData {
  date: string;
  coffinType: string;
  name: string;
  profit: number;
  outcome: number;
}
