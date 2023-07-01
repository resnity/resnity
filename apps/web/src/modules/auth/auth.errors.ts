import { createAppError } from '../../libs/app-error';
import { AuthErrorCode } from './auth.types';

const getLoginError = () => createAppError(AuthErrorCode.LOGIN, 'Login error');

const getTokenError = () => createAppError(AuthErrorCode.TOKEN, 'Token error');

export { getLoginError, getTokenError };
