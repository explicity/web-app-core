import { GenreEnum } from '../../common/enums';

import Article from '../entities/Article';

import { users } from './users';
import { annotations } from './annotations';

const now = new Date();

export const articles = [
  {
    id: '4cb2f551-b01c-45c2-b4be-62f1b32aa93c',
    title: 'We are published!',
    body:
      'The first article in the first newspaper is finally published. Enjoy!',
    publicationDate: now,
    genre: GenreEnum.school,
    author: users[0],
    annotation: annotations[0]
  }
] as Article[];
