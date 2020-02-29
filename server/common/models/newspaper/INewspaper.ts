import { IUser } from '../user';
import { IArticle } from '../article';

export interface INewspaper {
  id?: string;
  name: string;
  articles?: IArticle[];
  users?: IUser[];
}
