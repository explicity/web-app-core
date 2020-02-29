import { IRole } from '../role/IRole';
import { IArticle } from '../article';
import { INewspaper } from '../newspaper';
import ArticleReaction from '../../../data/entities/ArticleReaction';

export interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  emailConfirmed: boolean;
  articles?: IArticle[];
  newspapers?: INewspaper[];
  articleReaction?: ArticleReaction[];
  roles: IRole[];
}
