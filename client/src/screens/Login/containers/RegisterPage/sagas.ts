import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as authService from '../../services/auth.service';

import { register } from '../../routines';

function* registerUserRequest({ payload }: AnyAction) {
  try {
    const response = yield call(authService.registration, payload);

    yield put(register.success(response));
  } catch (error) {
    yield put(register.failure(error.message || 'Something went wrong!'));
  }
}

function* watchRegisterUserRequest() {
  yield takeEvery(register.TRIGGER, registerUserRequest);
}

export default function* registerSagas() {
  yield all([watchRegisterUserRequest()]);
}
