import { IShortUser } from './IShortUser';

export interface IUserRegistration extends IShortUser {
  password: string;
  firstName: string;
  lastName: string;
}
