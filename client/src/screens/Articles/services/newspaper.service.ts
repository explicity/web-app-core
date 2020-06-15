import callWebApi from 'helpers/webApi.helper';

import { IArticle } from '../models/article';

export const getNewspaperArticles = async ({
  newspaperId
}): Promise<IArticle[]> => {
  const response = await callWebApi({
    endpoint: `/newspapers/${newspaperId}/articles`,
    type: 'GET'
  });

  return response.json();
};

export const getExtendedNewspaperArticle = async ({
  newspaperId,
  articleId
}) => {
  const response = await callWebApi({
    endpoint: `/newspapers/${newspaperId}/articles/${articleId}`,
    type: 'GET'
  });

  return response.json();
};
