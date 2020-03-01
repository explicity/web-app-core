import { combineReducers } from 'redux';

import { reducerCreator } from 'helpers/reducer.helper';

import { article } from '../containers/ArticlesGridView/reducer';
import { fetchArticles } from '../routines';

const requests = combineReducers({
  article: reducerCreator([fetchArticles.TRIGGER])
});

export default combineReducers({ article, requests });
