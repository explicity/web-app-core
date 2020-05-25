import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as newspaperService from '../../services/newspaper.service';

import { fetchExtendedNewspaperArticle } from '../../routines';

function* fetchExtendedNewspaperArticleRequest({ payload }: AnyAction) {
  try {
    const { newspaperId, articleId } = payload;

    const article = yield call(newspaperService.getExtendedNewspaperArticle, {
      newspaperId,
      articleId
    });

    yield put(
      fetchExtendedNewspaperArticle.success({
        id: article.id,
        article
      })
    );
  } catch (error) {
    yield put(
      fetchExtendedNewspaperArticle.failure(
        error.message || 'Something went wrong! Please try again.'
      )
    );
  }
}

function* watchFetchExtendedNewspaperArticleRequest() {
  yield takeEvery(
    fetchExtendedNewspaperArticle.TRIGGER,
    fetchExtendedNewspaperArticleRequest
  );
}

export default function* extendedArticleSagas() {
  yield all([watchFetchExtendedNewspaperArticleRequest()]);
}
