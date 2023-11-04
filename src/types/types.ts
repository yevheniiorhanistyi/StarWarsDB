import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface ICommonProps {
  hasError: boolean;
  triggerError: () => void;
}

export interface IMainState {
  loading: boolean;
  inputValue: string;
  charList: ICharData[] | [];
}

export interface ISearchProps {
  value: string;
  onSearchChange: (newValue: string) => void;
  handleSubmit: () => void;
}

export interface ICharListProps {
  hasError: boolean;
  data: ICharData[] | [];
}

export interface IResourceResponse {
  count: number;
  next: string | null;
  previus: string | null;
  results: ICharData[];
}

export interface ICharData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}
