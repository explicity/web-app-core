import { IShortUser } from './IShortUser';

import { IArticle } from '../article';
import { IArticleReaction } from '../article-reaction';
import { IComment } from '../comment';

export interface IUser extends IShortUser {
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  articles?: IArticle[];
  articleReaction?: IArticleReaction[];
  comments?: IComment[];
}
