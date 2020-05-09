import User from '../../../data/entities/User';

export interface IUserLogin {
  token: string;
  user: User;
}
