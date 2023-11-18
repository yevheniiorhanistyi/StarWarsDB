import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ICharData, QueryParams, IResourceResponse } from '../types/types';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getAllCharacter: builder.query<IResourceResponse, { term: string; page: number }>({
      query: (arg: QueryParams) => {
        const { term, page } = arg;
        return `people/?search=${term}&page=${page}`;
      },
    }),
    getCharacter: builder.query<ICharData, string>({
      query: (id: string) => `people/${id}`,
    }),
  }),
});

export const { useGetCharacterQuery, useGetAllCharacterQuery } = swApi;
