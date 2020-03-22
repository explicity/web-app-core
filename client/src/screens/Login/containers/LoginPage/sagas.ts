import { takeEvery, put, call, all } from 'redux-saga/effects';

import { login } from '../../routines';

function* loginUserRequest({ payload }) {
  try {
    yield put(login.success());
  } catch (error) {
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
