import callWebApi from 'helpers/webApi.helper';
import { handleResponse } from '../helpers/handleResponse';

export const getUserDetails = async () => {
  try {
    const response = await callWebApi({
      endpoint: '/auth/user',
      type: 'GET'
    });

    const processedResponse = await handleResponse(response);
    return processedResponse;
  } catch (error) {
    // TODO handle error response properly
    return Promise.reject(error);
  }
};
