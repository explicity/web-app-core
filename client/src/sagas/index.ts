import { all } from 'redux-saga/effects';

import articleSagas from 'screens/Articles/sagas';
import authSagas from 'screens/Login/sagas';

export default function* rootSaga() {
  yield all([articleSagas(), authSagas()]);
}
