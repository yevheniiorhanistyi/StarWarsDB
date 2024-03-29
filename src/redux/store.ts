import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { swApi } from '../services/swApi';

import charactersReducer from './charactersSlice';

const rootReducer = combineReducers({
  charactersReducer,
  [swApi.reducerPath]: swApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swApi.middleware),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
