import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as authService from '../../services/auth.service';

import { login } from '../../routines';

function* loginUserRequest({ payload }) {
  try {
    const response = yield call(authService.login, payload);
    console.log(response);

    yield put(login.success());
  } catch (error) {
    console.log('error.message', error.message);
    yield put(login.failure(error.message || 'Something went wrong!'));
  }
}

function* watchLoginUserRequest() {
  // @ts-ignore
  yield takeEvery(login.TRIGGER, loginUserRequest);
}

export default function* loginSagas() {
  yield all([watchLoginUserRequest()]);
}
