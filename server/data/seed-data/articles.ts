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
    author: users[1],
    annotation: annotations[0]
  },
  {
    id: '6d7058a7-1d8e-40ae-a3cb-21b3f06e0ac6',
    title: 'Getting started!',
    body: 'Is there gonna be lots of articles? Who knows...',
    publicationDate: now,
    genre: GenreEnum.beauty,
    author: users[2],
    annotation: annotations[1]
  }
] as Article[];
