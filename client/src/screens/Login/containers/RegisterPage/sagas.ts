import { takeEvery, put, call, all } from 'redux-saga/effects';

import { register } from '../../routines';
import { IUserRegistration } from '../../models/user'

function* registerUserRequest({ payload }) {
  try {
    yield put(register.success())
  } catch (error) {
    yield put(register.failure(error.message || 'Something went wrong!'));
  }
}

function* watchRegisterUserRequest() {
  // @ts-ignore
  yield takeEvery(register.TRIGGER, registerUserRequest);
}

export default function* registerSagas() {
  yield all([watchRegisterUserRequest()]);
}
