import { Routine } from 'redux-saga-routines';
import { combineReducers } from 'redux';
import { uniq, merge } from 'lodash';

import {
  fetchNewspaperArticles,
  fetchExtendedNewspaperArticle
} from '../../routines';

const byId = (state = {}, action: Routine<any>) => {
  switch (action.type) {
    case fetchNewspaperArticles.SUCCESS: {
      if (action.payload.response) {
        return merge({}, state, action.payload.response.entities.articles);
      }
      return state;
    }
    case fetchExtendedNewspaperArticle.SUCCESS: {
      const { id, article } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          ...article
        }
      };
    }
    default:
      return state;
  }
};

const allIds = (state = [], action: Routine<any>) => {
  switch (action.type) {
    case fetchNewspaperArticles.SUCCESS:
      return uniq([...state, ...action.payload.response.result]);
    case fetchExtendedNewspaperArticle.SUCCESS:
      return uniq([...state, action.payload.id]);
    default:
      return state;
  }
};

const articles = combineReducers({
  byId,
  allIds
});

export default articles;
