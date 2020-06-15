import { AnyAction } from 'redux';
import { takeEvery, put, call, all } from 'redux-saga/effects';

import * as newspaperService from '../../services/newspaper.service';
import * as articleService from '../../services/article.service';

import {
  fetchExtendedNewspaperArticle,
  handleUserArticleReaction
} from '../../routines';

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

function* handleUserArticleReactionRequest({ payload }: AnyAction) {
  try {
    const { newspaperId, articleId, userId } = payload;

    const response = yield call(articleService.likeArticle, {
      newspaperId,
      articleId,
      userId
    });
    console.log('response', response);

    yield put(
      handleUserArticleReaction.success({
        id: articleId,
        isLiked: true
      })
    );
  } catch (error) {
    yield put(
      handleUserArticleReaction.failure(
        error.message || 'Something went wrong! Please try again.'
      )
    );
  }
}

function* watchFetchExtendedNewspaperArticle() {
  yield takeEvery(
    fetchExtendedNewspaperArticle.TRIGGER,
    fetchExtendedNewspaperArticleRequest
  );
}

function* watchHandleUserArticleReaction() {
  yield takeEvery(
    handleUserArticleReaction.TRIGGER,
    handleUserArticleReactionRequest
  );
}

export default function* extendedArticleSagas() {
  yield all([
    watchFetchExtendedNewspaperArticle(),
    watchHandleUserArticleReaction()
  ]);
}
