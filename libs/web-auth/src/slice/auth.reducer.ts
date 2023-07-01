import {
  AuthAction,
  ERROR_ACTION_TYPE,
  GET_ACCESS_TOKEN_COMPLETE_ACTION_TYPE,
  HANDLE_REDIRECT_COMPLETE_ACTION_TYPE,
  INITIALIZE_ACTION_TYPE,
  LOGOUT_ACTION_TYPE,
} from './auth.actions';
import { AuthState } from './auth.state';

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case INITIALIZE_ACTION_TYPE: {
      return {
        ...state,
        user: action.payload,
        error: undefined,
      };
    }
    case HANDLE_REDIRECT_COMPLETE_ACTION_TYPE: {
      return {
        ...state,
        user: action.payload,
        error: undefined,
      };
    }
    case GET_ACCESS_TOKEN_COMPLETE_ACTION_TYPE: {
      return {
        ...state,
        user: action.payload,
        error: undefined,
      };
    }
    case ERROR_ACTION_TYPE: {
      return {
        ...state,
        user: undefined,
        error: action.payload,
      };
    }
    case LOGOUT_ACTION_TYPE: {
      return {
        ...state,
        user: undefined,
        error: undefined,
      };
    }
    default:
      return state;
  }
};
