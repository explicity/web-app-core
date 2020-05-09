import { IUser } from '../user';
import { IArticle } from '../article';

export interface INewspaper {
  id?: string;
  title: string;
  articles?: IArticle[];
  users?: IUser[];
}
