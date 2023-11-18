import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCharData } from '../constats/constats';
import { ICharData, CharactersSliceState } from '../types/types';

const initialState: CharactersSliceState = {
  item: initialCharData,
  items: [],
  totalCount: 0,
  term: '',
  currentPage: 1,
  limit: 10,
  isLoadingCharacter: true,
  isLoadingCharacters: true,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<ICharData>) {
      state.item = action.payload;
      state.isLoadingCharacter = false;
    },
    setItems(state, action: PayloadAction<ICharData[]>) {
      state.items = action.payload;
      state.isLoadingCharacters = false;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setItem, setItems, setTotalCount, setTerm, setCurrentPage, setLimit } = charactersSlice.actions;

export default charactersSlice.reducer;
