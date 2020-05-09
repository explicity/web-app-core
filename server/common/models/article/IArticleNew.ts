import { GenreEnum } from '../../enums';

import { IUser } from '../user';
import { INewspaper } from '../newspaper';
import { ITag } from '../tag';

export interface IArticleNew {
  id?: string;
  title: string;
  subtitle?: string;
  content: string;
  genre: GenreEnum;
  likeCount: number;
  commentCount: number;
  imageLink?: string;
  authors: IUser[];
  newspapers: INewspaper[];
  tags?: ITag[];
}
