import { createRoutine } from 'redux-saga-routines';

export const fetchCurrentUser = createRoutine('FETCH_USER');
export const login = createRoutine('LOGIN_USER');
export const register = createRoutine('REGISTER_USER');
export const logout = createRoutine('LOGOUT');
