import { all } from 'redux-saga/effects';

import articleSagas from 'screens/Articles/sagas';

export default function* rootSaga() {
  yield all([articleSagas()]);
}
