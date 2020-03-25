import { createRoutine } from 'redux-saga-routines';

export const fetchUser = createRoutine('FETCH_USER');
export const login = createRoutine('LOGIN_USER');
export const register = createRoutine<any>('REGISTER_USER');
export const logout = createRoutine('LOGOUT');
