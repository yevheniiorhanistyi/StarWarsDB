import { RootState } from './store';

export const selectCharacters = (state: RootState) => state.charactersReducer;
export const selectFormData = (state: RootState) => state.formDataReducer;

export default selectCharacters;
