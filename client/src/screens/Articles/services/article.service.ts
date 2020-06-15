import callWebApi from 'helpers/webApi.helper';

export const likeArticle = async ({ newspaperId, articleId, userId }) => {
  const response = await callWebApi({
    endpoint: `/newspapers/${newspaperId}/articles/${articleId}/react`,
    type: 'POST',
    requestData: {
      newspaperId,
      articleId,
      userId,
      isLiked: true
    }
  });

  return response.json();
};
