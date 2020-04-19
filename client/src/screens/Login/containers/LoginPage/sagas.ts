import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as authService from '../../services/auth.service';

import { login } from '../../routines';

function* loginUserRequest({ payload }: AnyAction) {
  try {
    const response = yield call(authService.login, payload);

    yield put(login.success(response));
  } catch (error) {
    yield put(login.failure(error.message || 'Something went wrong!'));
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(login.TRIGGER, loginUserRequest);
}

export default function* loginSagas() {
  yield all([watchLoginUserRequest()]);
}
