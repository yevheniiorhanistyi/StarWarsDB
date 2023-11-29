import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ICharData, IResourceResponse, QueryParams } from '../types/types';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getAllCharacter: builder.query<IResourceResponse, { search: string; page: number }>({
      query: (arg: QueryParams) => {
        const { search, page } = arg;
        return `people/?search=${search}&page=${page}`;
      },
    }),
    getCharacter: builder.query<ICharData, string>({
      query: (id: string) => `people/${id}`,
    }),
  }),
});

export const { useGetCharacterQuery, useGetAllCharacterQuery } = swApi;
