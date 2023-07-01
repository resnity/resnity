import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { authReducer } from '../modules/auth/redux/auth.reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const configureAppStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    preloadedState,
    reducer: rootReducer,
  });

const store = configureAppStore();

type AppDispatch = typeof store.dispatch;

export default store;
export type { RootState, AppDispatch };
