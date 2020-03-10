import { schema } from 'normalizr';

export const article = new schema.Entity('articles');
export const arrayOfArticles = new schema.Array(article);
