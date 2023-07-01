import { User } from '@auth0/auth0-spa-js';

import { AppError } from '@resnity/web-common';

export type Action<TType extends string, TPayload = unknown> = {
  type: TType;
  payload: TPayload;
};

export const INITIALIZE_ACTION_TYPE = 'auth/initialize';
export const HANDLE_REDIRECT_COMPLETE_ACTION_TYPE =
  'auth/handleRedirectComplete';
export const GET_ACCESS_TOKEN_COMPLETE_ACTION_TYPE =
  'auth/getAccessTokenComplete';
export const ERROR_ACTION_TYPE = 'auth/error';
export const LOGOUT_ACTION_TYPE = 'auth/logout';

type InitializeAction = Action<typeof INITIALIZE_ACTION_TYPE, User | undefined>;
type HandleRedirectCompleteAction = Action<
  typeof HANDLE_REDIRECT_COMPLETE_ACTION_TYPE,
  User | undefined
>;
type GetAccessTokenCompleteAction = Action<
  typeof GET_ACCESS_TOKEN_COMPLETE_ACTION_TYPE,
  User | undefined
>;
type ErrorAction = Action<typeof ERROR_ACTION_TYPE, AppError>;
type LogoutAction = Action<typeof LOGOUT_ACTION_TYPE, undefined>;

export type AuthAction =
  | InitializeAction
  | HandleRedirectCompleteAction
  | GetAccessTokenCompleteAction
  | ErrorAction
  | LogoutAction;

export const initialize = (
  payload: InitializeAction['payload'],
): InitializeAction => ({
  type: INITIALIZE_ACTION_TYPE,
  payload,
});

export const handleRedirectComplete = (
  payload: HandleRedirectCompleteAction['payload'],
): HandleRedirectCompleteAction => ({
  type: HANDLE_REDIRECT_COMPLETE_ACTION_TYPE,
  payload,
});

export const getAccessTokenComplete = (
  payload: GetAccessTokenCompleteAction['payload'],
): GetAccessTokenCompleteAction => ({
  type: GET_ACCESS_TOKEN_COMPLETE_ACTION_TYPE,
  payload,
});

export const error = (payload: ErrorAction['payload']): ErrorAction => ({
  type: ERROR_ACTION_TYPE,
  payload,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT_ACTION_TYPE,
  payload: undefined,
});
