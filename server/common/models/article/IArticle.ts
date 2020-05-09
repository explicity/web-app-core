import { GenreEnum } from '../../enums';

import { IUser } from '../user';
import { INewspaper } from '../newspaper';
import { ITag } from '../tag';
import { IArticleReaction } from '../article-reaction';
import { IAnnotation } from '../annotation';

export interface IArticle {
  id?: string;
  title: string;
  subtitle?: string;
  content: string;
  publicationDate: Date;
  genre: GenreEnum;
  imageLink?: string;
  likeCount: number;
  commentCount: number;
  authors: IUser[];
  newspapers: INewspaper[];
  annotation: IAnnotation;
  tags?: ITag[];
  articleReaction?: IArticleReaction[];
}
