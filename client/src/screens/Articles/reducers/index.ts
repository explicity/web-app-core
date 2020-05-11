import { combineReducers } from 'redux';

import { reducerCreator } from 'helpers/reducer.helper';

import articles from '../containers/ArticlesGridView/reducer';
import { fetchNewspaperArticles } from '../routines';

const requests = combineReducers({
  articles: reducerCreator([fetchNewspaperArticles.TRIGGER])
});

export default combineReducers({ articles, requests });
