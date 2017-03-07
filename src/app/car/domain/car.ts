
export interface Car {
  brand: string;
  model: string;
  year: string;
  condition: string;
}


export interface CarState {
  term: string;
  cars: Car[];
}
