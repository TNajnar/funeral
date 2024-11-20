export type TWarehouseItem = {
  comment?: string;
  date: string;
  id: number;
  isFlagged: boolean;
  name: string;
  availableCount: number;
}

export interface IDialogData {
  date: string;
  coffinType: string;
  name: string;
  profit: number;
  outcome: number;
}

export const MOCK_WAREHOUSE_ITEMS: TWarehouseItem[] = [
  {
    comment: 'Elegantní design s tmavým lakem.',
    date: '2024-11-20',
    id: 1,
    isFlagged: false,
    name: 'Dubová rakev',
    availableCount: 5,
  },
  {
    comment: 'Používáno pro přepravu.',
    date: '2024-11-18',
    id: 2,
    isFlagged: true,
    name: 'Transportní vak',
    availableCount: 2,
  },
  {
    comment: 'Luxusní hedvábné polstrování.',
    date: '2024-11-15',
    id: 3,
    isFlagged: false,
    name: 'Sametový rubáš',
    availableCount: 10,
  },
  {
    date: '2024-11-10',
    id: 4,
    isFlagged: true,
    name: 'Krematorium urny',
    availableCount: 7,
  },
  {
    comment: 'Dřevěná varianta, ručně vyřezávaná.',
    date: '2024-11-12',
    id: 5,
    isFlagged: false,
    name: 'Pamětní deska',
    availableCount: 15,
  },
  {
    date: '2024-11-05',
    id: 6,
    isFlagged: false,
    name: 'Stojan na věnce',
    availableCount: 25,
  },
  {
    comment: 'Značené jako křehké.',
    date: '2024-11-08',
    id: 7,
    isFlagged: true,
    name: 'Skleněné urny',
    availableCount: 4,
  },
  {
    date: '2024-11-07',
    id: 8,
    isFlagged: false,
    name: 'Kondolenční knihy',
    availableCount: 50,
  },
  {
    comment: 'Používá se pro katolické obřady.',
    date: '2024-11-02',
    id: 9,
    isFlagged: false,
    name: 'Kříže na rakev',
    availableCount: 12,
  },
  {
    date: '2024-11-01',
    id: 10,
    isFlagged: true,
    name: 'Speciální balzamovací sady',
    availableCount: 3,
  },
];

