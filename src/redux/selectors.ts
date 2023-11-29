import { RootState } from './store';

export const selectCharacters = (state: RootState) => state.charactersReducer;

export default selectCharacters;
