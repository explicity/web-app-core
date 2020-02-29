export interface IGlobalState {
  [domain: string]: {
    requests: {
      [dataRequest: string]: {
        loading: boolean;
        error: string;
      };
    };
    [data: string]: any;
  };
}
