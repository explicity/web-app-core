import { takeEvery, put, call, all } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schema from './shema';
import * as articleService from '../../services/article.service';

import { fetchArticles } from '../../routines';
import { IArticle } from '../../models/article';

function* fetchArticlesRequest() {
  try {
    const response: IArticle[] = yield call(articleService.getArticles);

    yield put(
      fetchArticles.success({
        response: normalize(response, schema.arrayOfArticles)
      })
    );
  } catch (error) {
    yield put(fetchArticles.failure(error.message || 'Something went wrong!'));
  }
}

function* watchFetchArticlesRequest() {
  yield takeEvery(fetchArticles.TRIGGER, fetchArticlesRequest);
}

export default function* articleSagas() {
  yield all([watchFetchArticlesRequest()]);
}
