import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, FormDataSliceState } from '../types/types';
import { countries } from '../constats/constats';

const initialState: FormDataSliceState = {
  users: [],
  countries,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserData>) {
      state.users.push(action.payload);
    },
  },
});

export const { setUsers } = formDataSlice.actions;

export default formDataSlice.reducer;
