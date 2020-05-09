import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as authService from '../../services/auth.service';
import * as userService from '../../services/user.service';

import { login, fetchCurrentUser, logout } from '../../routines';

function* loginRequest({ payload }: AnyAction) {
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

function* logoutRequest() {
  try {
    yield call(authService.logout);

    yield put(logout.success());
  } catch (error) {
    yield put(logout.failure(error.message || 'Something went wrong!'));
  }
}

function* watchLoginRequest() {
  yield takeEvery(login.TRIGGER, loginRequest);
}

function* watchFetchCurrentUser() {
  yield takeEvery(fetchCurrentUser.TRIGGER, fetchCurrentUserRequest);
}

function* watchLogoutRequest() {
  yield takeEvery(logout.TRIGGER, logoutRequest);
}

export default function* loginSagas() {
  yield all([
    watchLoginRequest(),
    watchFetchCurrentUser(),
    watchLogoutRequest()
  ]);
}
