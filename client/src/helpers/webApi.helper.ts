import * as queryString from 'query-string';

import { authHeader } from 'screens/Login/helpers/authHeader';
import { IFetchArgs, IFetchArgsData } from 'models/fetch';

function getFetchUrl({ endpoint, queryParams }: IFetchArgsData) {
  return `http://${process.env.REACT_APP_API_HOST}:${
    process.env.REACT_APP_API_PORT
  }/api${endpoint}${
    queryParams ? `?${queryString.stringify(queryParams)}` : ''
  }`;
}

function getInitHeaders(
  args: IFetchArgsData,
  contentType = 'application/json',
  hasContent = true
) {
  const headers: HeadersInit = new Headers();
  const header = authHeader();
  if (!args.skipAuthorization) {
    headers.set('Authorization', header.Authorization);
  }
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  return headers;
}

function getFetchArgs(args: IFetchArgsData): IFetchArgs {
  const headers = getInitHeaders(args);
  if (args.requestData && args.type === 'GET') {
    throw new Error('GET request does not support request body.');
  }

  return {
    method: args.type,
    headers,
    ...(args.type === 'GET' ? {} : { body: JSON.stringify(args.requestData) })
  };
}

export async function throwIfResponseFailed(res: Response) {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
    throw parsedException;
  }
}

export default async function callWebApi(
  args: IFetchArgsData
): Promise<Response> {
  const res = await fetch(getFetchUrl(args), getFetchArgs(args));
  await throwIfResponseFailed(res);
  return res;
}
