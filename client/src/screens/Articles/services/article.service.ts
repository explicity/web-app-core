import callWebApi from 'helpers/webApi.helper';

import { IArticle } from '../models/article';

export const getArticles = async (): Promise<IArticle[]> => {
  const response = await callWebApi({
    endpoint: `/api/articles`,
    type: 'GET'
  });
  return response.json();
};
