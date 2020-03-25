import { BehaviorSubject } from 'rxjs';

import callWebApi from 'helpers/webApi.helper';
import { handleResponse } from '../helpers/handleResponse';

import { IUserRegistration, IUser } from '../models/user';

const tokenSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('token'))
);

export const authService = {
  token: tokenSubject.asObservable(),
  get tokenValue() {
    return tokenSubject.value;
  }
};

export const login = async (data: IUser) => {
  const response = await callWebApi({
    endpoint: '/auth/login',
    requestData: data,
    type: 'POST'
  });

  const token = await handleResponse(response);
  localStorage.setItem('token', JSON.stringify(token));
  tokenSubject.next(token);

  return response.json();
};

export const registration = async (data: IUserRegistration) => {
  const response = await callWebApi({
    endpoint: '/auth/register',
    requestData: data,
    type: 'POST'
  });

  return response.json();
};

export const logout = async () => {
  localStorage.removeItem('token');
  tokenSubject.next(null);
};
