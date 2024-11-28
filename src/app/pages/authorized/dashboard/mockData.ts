import { TPlannedFuneralTable } from './dashboard.model';

export const MOCK_FUNERAL_DATA: TPlannedFuneralTable[] = [
  {
    id: 1,
    dateOfNegotiation: '2023-01-01',
    placeCeremony: 'Kostel sv. Jana',
    timeCeremony: '2023-01-05 10:00',
    deceased: 'Jan Novák',
    customer: 'Petr Novák'
  },
  {
    id: 2,
    dateOfNegotiation: '2023-02-15',
    placeCeremony: 'Krematorium Praha',
    timeCeremony: '2023-02-20 14:00',
    deceased: 'Marie Svobodová',
    customer: 'Jana Svobodová'
  },
  {
    id: 3,
    dateOfNegotiation: '2023-03-10',
    placeCeremony: 'Hřbitov Olšany',
    timeCeremony: '2023-03-15 11:00',
    deceased: 'Karel Dvořák',
    customer: 'Eva Dvořáková'
  },
  {
    id: 4,
    dateOfNegotiation: '2023-04-05',
    placeCeremony: 'Kostel sv. Václava',
    timeCeremony: '2023-04-10 09:00',
    deceased: 'Anna Novotná',
    customer: 'Tomáš Novotný'
  },
  {
    id: 5,
    dateOfNegotiation: '2023-05-20',
    placeCeremony: 'Krematorium Brno',
    timeCeremony: '2023-05-25 13:00',
    deceased: 'Josef Černý',
    customer: 'Lucie Černá'
  }
];
