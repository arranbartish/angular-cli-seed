
export interface House {
  country: string;
  state: string;
  city: string;
  construction: string;
  rooms: number;
}


export interface HousesState {
  term: string;
  houses: House[];
}
