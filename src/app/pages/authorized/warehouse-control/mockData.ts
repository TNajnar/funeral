import { ETabVariants, type TWarehouseItem } from './warehouse-control.model';

export const MOCK_WAREHOUSE_ITEMS: TWarehouseItem[] = [
  {
    comment: 'Elegantní design s tmavým lakem.',
    date: '2024-11-20',
    id: 1,
    isFlagged: false,
    name: 'Dubová rakev',
    availableCount: 5,
    tabType: ETabVariants.Coffin,
  },
  {
    comment: 'Používáno pro přepravu.',
    date: '2024-11-18',
    id: 2,
    isFlagged: true,
    name: 'Transportní vak',
    availableCount: 2,
    tabType: ETabVariants.Coffin,
  },
  {
    comment: 'Luxusní hedvábné polstrování.',
    date: '2024-11-15',
    id: 3,
    isFlagged: false,
    name: 'Sametový rubáš',
    availableCount: 10,
    tabType: ETabVariants.Coffin,
  },
  {
    date: '2024-11-10',
    id: 4,
    isFlagged: true,
    name: 'Krematorium urny',
    availableCount: 7,
    tabType: ETabVariants.Urns,
  },
  {
    comment: 'Dřevěná varianta, ručně vyřezávaná.',
    date: '2024-11-12',
    id: 5,
    isFlagged: false,
    name: 'Pamětní deska',
    availableCount: 15,
    tabType: ETabVariants.Flowers,
  },
  {
    date: '2024-11-05',
    id: 6,
    isFlagged: false,
    name: 'Stojan na věnce',
    availableCount: 25,
    tabType: ETabVariants.Flowers,
  },
  {
    comment: 'Značené jako křehké.',
    date: '2024-11-08',
    id: 7,
    isFlagged: true,
    name: 'Skleněné urny',
    availableCount: 4,
    tabType: ETabVariants.Urns,
  },
  {
    date: '2024-11-07',
    id: 8,
    isFlagged: false,
    name: 'Kondolenční knihy',
    availableCount: 50,
    tabType: ETabVariants.Flowers,
  },
  {
    comment: 'Používá se pro katolické obřady.',
    date: '2024-11-02',
    id: 9,
    isFlagged: false,
    name: 'Kříže na rakev',
    availableCount: 12,
    tabType: ETabVariants.Coffin,
  },
  {
    date: '2024-11-01',
    id: 10,
    isFlagged: true,
    name: 'Speciální balzamovací sady',
    availableCount: 3,
    tabType: ETabVariants.Coffin,
  },
];
