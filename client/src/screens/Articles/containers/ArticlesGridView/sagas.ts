import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schema from './shema';
import * as newspaperService from '../../services/newspaper.service';

import { fetchNewspaperArticles } from '../../routines';

function* fetchNewspaperArticlesRequest({ payload }: AnyAction) {
  try {
    const { newspaperId } = payload;
    const response = yield call(newspaperService.getNewspaperArticles, {
      newspaperId
    });

    yield put(
      fetchNewspaperArticles.success({
        response: normalize(response.articles, schema.arrayOfArticles)
      })
    );
  } catch (error) {
    yield put(
      fetchNewspaperArticles.failure(error.message || 'Something went wrong!')
    );
  }
}
function* watchFetchNewspaperArticlesRequest() {
  yield takeEvery(
    fetchNewspaperArticles.TRIGGER,
    fetchNewspaperArticlesRequest
  );
}

export default function* articleSagas() {
  yield all([watchFetchNewspaperArticlesRequest()]);
}
