import { all } from 'redux-saga/effects';

import articleSagas from '../containers/ArticlesGridView/sagas';

export default function* rootSaga() {
  yield all([articleSagas()]);
}
