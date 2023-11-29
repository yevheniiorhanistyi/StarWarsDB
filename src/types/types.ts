import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface IResourceResponse {
  count: number;
  next: string | null;
  previous: string | null;
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
  created: string;
  edited: string;
  url: string;
}

export interface IUsePaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize?: number;
  siblingCount?: number;
}

export type QueryParams = {
  search: string;
  page: number;
};

export interface CharactersSliceState {
  totalCount: number;
  search: string;
  currentPage: number;
  limit: number;
}

export type ContextType = { page: number; charId: string };
