import { GenreEnum } from '../../enums';

import { IUser } from '../user';
import { IAnnotation } from '../annotation';

export interface IArticle {
  id?: string;
  title: string;
  subtitle?: string;
  body: string;
  publicationDate: Date;
  genre: GenreEnum;
  imageLink?: string;
  author: IUser;
  annotation: IAnnotation;
  // tags?: ITag[];
  // articleReaction?: IArticleReaction[];
}
