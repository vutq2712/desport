import { throwError } from 'rxjs'
import { ajax, AjaxRequest, AjaxResponse, } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { getAccessToken } from '@app/services/auth'

export const handleError = () => (error: AjaxResponse<JsonResponse<any>>) => {
  return throwError(() => error.response);
}

interface RequestOptions {
  url: string;
  body?: any;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: any;
}

interface JsonResponse<Data> {
  code?: number;
  msg?: string;
  data: Data;
}

export class Http {
  public static request<Data = any>(requestOpts: RequestOptions) {
    let accessToken: string | undefined = '';

    if (typeof window !== 'undefined') {
      accessToken = getAccessToken();
    }

    const ajaxRequest: AjaxRequest = {
      ...requestOpts,
      async: true,
      crossDomain: true,
      responseType: 'json',
      timeout: 100000,
      withCredentials: false,
      headers: requestOpts.headers ? {
        'lang': 'en',
        ...requestOpts.headers,
      } : {
        'lang': 'en',
        'Content-Type': 'application/json',
      }
    };

    if (accessToken) {
      (ajaxRequest as any).headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return ajax(ajaxRequest).pipe(
      catchError(handleError()),
      map<AjaxResponse<any>, JsonResponse<Data>>(res => res.response),
    );
  }
}
