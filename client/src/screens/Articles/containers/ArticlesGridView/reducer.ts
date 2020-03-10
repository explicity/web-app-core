import { Routine } from 'redux-saga-routines';
import { combineReducers } from 'redux';
import _ from 'lodash';

import { fetchArticles } from '../../routines';

const byId = (state = {}, action: Routine<any>) => {
  switch (action.type) {
    case fetchArticles.SUCCESS:
      return {
        ...state,
        ...action.payload.response.entities.articles
      };
    default:
      return state;
  }
};

const allIds = (state = [], action: Routine<any>) => {
  switch (action.type) {
    case fetchArticles.SUCCESS:
      return _.uniq([...state, ...action.payload.response.result]);
    default:
      return state;
  }
};

const articles = combineReducers({
  byId,
  allIds
});

export default articles;
