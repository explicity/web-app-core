import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as authService from '../../services/auth.service';
import * as userService from '../../services/user.service';

import { login, fetchCurrentUser } from '../../routines';

function* loginUserRequest({ payload }: AnyAction) {
  try {
    const response = yield call(authService.login, payload);

    yield put(login.success(response));
  } catch (error) {
    yield put(login.failure(error.message || 'Something went wrong!'));
  }
}

function* fetchCurrentUserRequest() {
  try {
    const response = yield call(userService.getUserDetails);

    yield put(fetchCurrentUser.success(response));
  } catch (error) {
    yield put(
      fetchCurrentUser.failure(error.message || 'Something went wrong!')
    );
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(login.TRIGGER, loginUserRequest);
}

function* watchFetchCurrentUser() {
  yield takeEvery(fetchCurrentUser.TRIGGER, fetchCurrentUserRequest);
}

export default function* loginSagas() {
  yield all([watchLoginUserRequest(), watchFetchCurrentUser()]);
}
