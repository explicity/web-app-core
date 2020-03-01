import { takeEvery, put, call, all } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schema from './shema';
import * as articleService from '../../services/article.service';

import { fetchArticles } from '../../routines';

function* fetchArticlesRequest() {
  try {
    const response = yield call(articleService.getArticles);
    // console.log('response', normalize(response, schema.arrayOfArticles));
    yield put(fetchArticles.success(response));
  } catch (error) {
    yield put(fetchArticles.failure(error.message));
  }
}

function* watchFetchArticlesRequest() {
  yield takeEvery(fetchArticles.TRIGGER, fetchArticlesRequest);
}

export default function* articleSagas() {
  yield all([watchFetchArticlesRequest()]);
}
