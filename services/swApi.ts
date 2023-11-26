import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type {
  ICharData,
  IResourceResponse,
  QueryParams,
  QueryParam,
} from "../types/types";

export const swApi = createApi({
  reducerPath: "swApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getAllCharacter: builder.query<
      IResourceResponse,
      { search: string; requestedPage: number }
    >({
      query: (arg: QueryParams) => {
        const { search, requestedPage } = arg;
        return `people/?search=${search}&page=${requestedPage}`;
      },
    }),
    getCharacter: builder.query<ICharData, { details: string }>({
      query: (arg: QueryParam) => {
        const { details } = arg;
        return `people/${details}`;
      },
    }),
  }),
});

export const { useGetCharacterQuery, useGetAllCharacterQuery } = swApi;
