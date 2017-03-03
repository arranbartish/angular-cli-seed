export interface SearchEvent {
  name: string;
  term: string;
}

export interface SeachState {
  term: string;
}

export enum SearchAction {
  CHANGE_TERM
}
