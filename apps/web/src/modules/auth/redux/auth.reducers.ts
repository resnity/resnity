import { createReducer } from '@reduxjs/toolkit';

import {
  error,
  getAccessTokenComplete,
  handleRedirectComplete,
  initialize,
  logout,
} from './auth.actions';
import { authInitialState } from './auth.state';

const authReducer = createReducer(authInitialState, (builder) => {
  builder.addCase(initialize, (state, action) => {
    state.user = action.payload;
    state.error = undefined;
  });
  builder.addCase(handleRedirectComplete, (state, action) => {
    state.user = action.payload;
    state.error = undefined;
  });
  builder.addCase(getAccessTokenComplete, (state, action) => {
    state.user = action.payload;
    state.error = undefined;
  });
  builder.addCase(error, (state, action) => {
    state.user = undefined;
    state.error = action.payload;
  });
  builder.addCase(logout, (state) => {
    state.user = undefined;
    state.error = undefined;
  });
});

export { authReducer };
