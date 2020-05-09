import { all } from 'redux-saga/effects';

import registerSagas from '../containers/RegisterPage/sagas';
import loginSagas from '../containers/LoginPage/sagas';

export default function* rootSaga() {
  yield all([registerSagas(), loginSagas()]);
}
