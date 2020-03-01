import { Routine } from 'redux-saga-routines';

import { fetchArticles } from '../../routines';

export const article = (state = [], action: Routine<any>) => {
  switch (action.type) {
    case fetchArticles.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
