import { IShortUser } from './IShortUser';

import { IArticle } from '../article';
import { IArticleReaction } from '../article-reaction';

export interface IUser extends IShortUser {
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  articles?: IArticle[];
  articleReaction?: IArticleReaction[];
}
