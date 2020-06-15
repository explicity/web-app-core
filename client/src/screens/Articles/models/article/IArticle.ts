import { GenreEnum } from '../../enums';

import { IUser } from '../user';
import { IAnnotation } from '../annotation';
import { ITag } from '../tag';
import { IArticleReaction } from '../article-reaction';
import { IComment } from '../comment';

export interface IArticle {
  id?: string;
  title: string;
  subtitle?: string;
  content: string;
  publicationDate: Date;
  genre: GenreEnum;
  imageLink?: string;
  authors: IUser[];
  annotation: IAnnotation;
  tags?: ITag[];
  articleReaction?: IArticleReaction[];
  comments?: IComment[];
}
