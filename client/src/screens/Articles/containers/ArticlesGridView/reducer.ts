import { Routine } from 'redux-saga-routines';
import { combineReducers } from 'redux';
import _ from 'lodash';

import { fetchArticles } from '../../routines';

type IArticlesState = {
  byId: any,
  allIds: string[]
}

const articlesById = (state = {}, action: Routine<any>) => {
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

const allArticles = (state = [], action: Routine<any>) => {
  switch (action.type) {
    case fetchArticles.SUCCESS:
      return _.uniq([...state, ...action.payload.response.result]);
    default:
      return state;
  }
};

const articles = combineReducers({
  byId: articlesById,
  allIds: allArticles
});

export default articles;

export const getAllArticles = (state: IArticlesState) => 
  state.allIds.map((id: string) => state.byId[id]);
