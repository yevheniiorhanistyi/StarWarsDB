import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface ICharInfoProps {
  charData: ICharData;
  imgSrc: string;
}

export interface ICharListProps {
  items: ICharData[];
  limit: number;
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
  requestedPage: number;
};

export type QueryParam = {
  details: string;
};

export interface CharactersSliceState {
  item: ICharData;
  items: ICharData[];
  totalCount: number;
  term: string;
  currentPage: number;
  limit: number;
  isLoadingCharacters: boolean;
  isLoadingCharacter: boolean;
}
