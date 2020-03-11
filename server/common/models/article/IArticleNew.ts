import { GenreEnum } from '../../enums';

import { IUser } from '../user';
import { INewspaper } from '../newspaper';
import { ITag } from '../tag';

export interface IArticleNew {
  id?: string;
  title: string;
  subtitle?: string;
  body: string;
  genre: GenreEnum;
  imageLink?: string;
  author: IUser;
  newspaper: INewspaper;
  tags?: ITag[];
}
