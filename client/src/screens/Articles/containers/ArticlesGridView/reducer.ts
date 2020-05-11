import { Routine } from 'redux-saga-routines';
import { combineReducers } from 'redux';
import uniq from 'lodash/uniq';

import { fetchNewspaperArticles } from '../../routines';

const articlesById = (state = {}, action: Routine<any>) => {
  switch (action.type) {
    case fetchNewspaperArticles.SUCCESS:
      return {
        ...state,
        ...action.payload.response.entities.articles
      };

    default:
      return state;
  }
};

const allArticlesIds = (state = [], action: Routine<any>) => {
  switch (action.type) {
    case fetchNewspaperArticles.SUCCESS:
      return uniq([...state, ...action.payload.response.result]);
    default:
      return state;
  }
};

const articles = combineReducers({
  byId: articlesById,
  allIds: allArticlesIds
});

export default articles;
