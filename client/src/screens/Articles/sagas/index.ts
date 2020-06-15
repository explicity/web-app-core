import { all } from 'redux-saga/effects';

import articleSagas from '../containers/ArticlesGridView/sagas';
import extendedArticleSagas from '../containers/ArticleView/sagas';

export default function* rootSaga() {
  yield all([articleSagas(), extendedArticleSagas()]);
}
