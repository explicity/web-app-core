import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as authService from '../../services/auth.service';

import { register } from '../../routines';

function* registerRequest({ payload }: AnyAction) {
  try {
    const response = yield call(authService.registration, payload);

    yield put(register.success(response));
  } catch (error) {
    yield put(register.failure(error.message || 'Something went wrong!'));
  }
}

function* watchRegisterRequest() {
  yield takeEvery(register.TRIGGER, registerRequest);
}

export default function* registerSagas() {
  yield all([watchRegisterRequest()]);
}
