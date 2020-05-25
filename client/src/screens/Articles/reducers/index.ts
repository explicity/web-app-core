import { combineReducers } from 'redux';

import { reducerCreator } from 'helpers/reducer.helper';

import articles from '../containers/ArticlesGridView/reducer';
import {
  fetchNewspaperArticles,
  fetchExtendedNewspaperArticle
} from '../routines';

const requests = combineReducers({
  articles: reducerCreator([fetchNewspaperArticles.TRIGGER]),
  extendedArticle: reducerCreator([fetchExtendedNewspaperArticle.TRIGGER])
});

export default combineReducers({ articles, requests });
