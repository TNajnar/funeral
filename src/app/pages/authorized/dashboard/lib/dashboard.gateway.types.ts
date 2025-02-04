export type TPlannedFuneralTable = {
  companyId: number;
  contact: string
  customer: string;
  dateOfNegotiation: string;
  deceased: string;
  id: number;
  placeCeremony: string;
  timeCeremony: string;
};

export type TAddNewFuneralArgs = {
  companyId: number;
  contact: string
  customer: string;
  deceased: string;
  placeCeremony: string;
  timeCeremony: string;
};
