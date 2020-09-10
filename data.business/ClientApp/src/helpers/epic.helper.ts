import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { getActiveLanguage } from 'react-localize-redux';
import { IApplicationState } from '../reducers/rootReducer';
import * as API from '../constants/api.constants';
import { TokenHelper } from './token.helper';

export interface IWebResponse {
  body: Object;
  message: string;
  statusCode: number;
}

export interface QueryParam {
  key: string;
  value: string;
}

const buildQueryParamsString = (queryParams?: QueryParam[]) => {
  let queryString = '';

  if (queryParams && queryParams.length > 0) {
    if (
      queryParams !== null &&
      queryParams !== undefined &&
      queryParams.length > 0
    ) {
      for (let i = 0; i < queryParams.length; i++) {
        if (i === 0) queryString += '?';
        else queryString += '&';

        queryString += `${queryParams[i].key}=${queryParams[i].value}`;
      }
    }

    if (queryString === null || queryString === undefined) queryString = '';
  }

  return queryString;
};

export const getWebRequest = (
  urlPath: string,
  state: IApplicationState,
  queryParams?: QueryParam[]
) => {
  let queryString = `${API.SERVER_URL}/${urlPath}${buildQueryParamsString(
    queryParams
  )}`;

  return ajax
    .getJSON<IWebResponse>(queryString, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TokenHelper.getAccessToken()}`,
    })
    .pipe(map((response) => response.body));
};

export const postWebRequest = (
  urlPath: string,
  body: any,
  state: IApplicationState,
  token = false
) => {
  let header = {
    'Content-Type': 'application/json',
  };

  if (token) {
    header = Object.assign(header, {
      Authorization: `Bearer ${TokenHelper.getAccessToken()}`,
    });
  }

  return ajax
    .post(`${API.SERVER_URL}/${urlPath}`, body, header)
    .pipe(map((response) => response.response));
};

export const postFormDataWebRequest = (
  urlPath: string,
  body: any,
  state: IApplicationState,
  queryParams?: QueryParam[]
) => {
  const header = {
    Authorization: `Bearer ${TokenHelper.getAccessToken()}`,
  };

  return ajax
    .post(
      `${API.SERVER_URL}/${urlPath}${buildQueryParamsString(queryParams)}`,
      body,
      header
    )
    .pipe(map((response) => response.response));
};

export const putWebRequest = (
  urlPath: string,
  body: any,
  state: IApplicationState
) => {
  let header = {
    Authorization: `Bearer ${TokenHelper.getAccessToken()}`,
    'Content-Type': 'application/json',
  };
  return ajax
    .put(`${API.SERVER_URL}/${urlPath}`, body, header)
    .pipe(map((response) => response.response));
};

export const putFormDataWebRequest = (
  urlPath: string,
  body: FormData,
  state: IApplicationState,
  queryParams?: QueryParam[]
) => {
  let header = {
    Authorization: `Bearer ${TokenHelper.getAccessToken()}`,
    // 'Content-Type': 'application/json',
  };

  return ajax
    .put(
      `${API.SERVER_URL}/${urlPath}${buildQueryParamsString(queryParams)}`,
      body,
      header
    )
    .pipe(map((response) => response.response));
};

export const deleteWebRequest = (
  urlPath: string,
  state: IApplicationState,
  queryParams?: QueryParam[]
) => {
  let header = {
    Authorization: `Bearer ${TokenHelper.getAccessToken()}`,
  };

  let queryString = `${API.SERVER_URL}/${urlPath}${buildQueryParamsString(
    queryParams
  )}`;

  return ajax
    .delete(queryString, header)
    .pipe(map((response) => response.response));
};
