import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../redux/redux.store';

const selectAuth = createSelector(
  (rootState: RootState) => rootState,
  (state) => state.auth,
);

const selectUser = createSelector(selectAuth, (auth) => auth.user);

const selectIsAuthenticated = createSelector(
  selectUser,
  (user) => user !== undefined,
);

const selectError = createSelector(selectAuth, (auth) => auth.error);

export { selectError, selectIsAuthenticated, selectUser };
