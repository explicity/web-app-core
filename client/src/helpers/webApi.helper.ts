import * as queryString from 'query-string';
import { IFetchArgs, IFetchArgsData } from 'models/fetch';

function getFetchUrl({ endpoint, queryParams }: IFetchArgsData) {
  return `http://${process.env.REACT_APP_API_HOST}:${
    process.env.REACT_APP_API_PORT
  }/api${endpoint}${
    queryParams ? `?${queryString.stringify(queryParams)}` : ''
  }`;
}

function getFetchArgs(args: IFetchArgsData): IFetchArgs {
  const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  let body: string;
  if (args.requestData) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.requestData);
  }

  return {
    method: args.type,
    headers,
    ...(args.type === 'GET' ? {} : { body })
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
  try {
    const res = await fetch(getFetchUrl(args), getFetchArgs(args));
    await throwIfResponseFailed(res);
    return res;
  } catch (err) {
    throw err;
  }
}
