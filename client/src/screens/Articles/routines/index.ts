import { createRoutine } from 'redux-saga-routines';

export const fetchNewspaperArticles = createRoutine('FETCH_NEWSPAPER_ARTICLES');
export const fetchExtendedNewspaperArticle = createRoutine(
  'FETCH_EXTENDED_NEWSPAPER_ARTICLE'
);
