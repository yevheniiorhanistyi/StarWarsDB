import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersSliceState } from '../types/types';

const initialState: CharactersSliceState = {
  totalCount: 0,
  search: '',
  currentPage: 1,
  limit: 10,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setTotalCount, setSearch, setCurrentPage, setLimit } = charactersSlice.actions;

export default charactersSlice.reducer;
