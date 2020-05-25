import { createSelector } from 'reselect';

const getArticles = state => state.article.articles.byId;

export const getExtendedArticle = (state, id) => state.article.articles.byId[id];

export const getArticlesState = createSelector([getArticles], articles =>
  Object.values(articles)
);
