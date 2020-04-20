import { BehaviorSubject, Observable } from 'rxjs';

import callWebApi from 'helpers/webApi.helper';
import { handleResponse } from '../helpers/handleResponse';

import { IUserRegistration, IUser } from '../models/user';

const tokenSubject = !!localStorage.getItem('token');

export const authService = {
  isLoginSubject: new BehaviorSubject<boolean>(tokenSubject),

  get isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  },

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoginSubject.next(true);
  },

  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }
};

export const login = async (data: IUser) => {
  const response = await callWebApi({
    endpoint: '/auth/login',
    requestData: data,
    type: 'POST'
  });

  const processedResponse = await handleResponse(response);
  authService.login(processedResponse.token);

  return processedResponse;
};

export const registration = async (data: IUserRegistration) => {
  const response = await callWebApi({
    endpoint: '/auth/register',
    requestData: data,
    type: 'POST'
  });

  const processedResponse = await handleResponse(response);
  authService.login(processedResponse.token);

  return processedResponse;
};

export const logout = async () => {
  authService.logout();
};
