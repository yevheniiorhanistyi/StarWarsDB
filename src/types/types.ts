import { ReactNode } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

export interface Props {
  children?: ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface ISearchInputProps {
  value: string;
  onSearchChange: (newValue: string) => void;
  handleSubmit: () => void;
}

export interface ICharListProps {
  openInfo: (charNumber: number) => void;
}

export interface ICharInfoProps {
  charData: ICharData;
  imgSrc: string;
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
  created: Date;
  edited: Date;
  url: string;
}

export interface IUsePaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize?: number;
  siblingCount?: number;
}

export interface IPaginationProps {
  currentPage: number;
  onPageChange: (value: number) => void;
}

export type ContextType = { frontPage: number; charId: string; setSearchParams: SetURLSearchParams };
