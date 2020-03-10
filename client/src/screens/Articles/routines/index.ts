import { createRoutine } from 'redux-saga-routines';

export const fetchArticles = createRoutine<any>('FETCH_ARTICLES');
