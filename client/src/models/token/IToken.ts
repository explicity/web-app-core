import { IUserData } from './IUserData';

export interface IToken {
  data: IUserData;
  iat: number;
  exp: number;
}
