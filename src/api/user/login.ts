import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  token: {
    accessToken: string;
    expiredTime: number;
  };
}

export function login(params: LoginParams) {
  return Http.request<LoginData>({
    url: `${API_END_POINT}/user/login`,
    method: 'POST',
    body: params,
  });
}

export interface GoogleLoginRequest {
  id_token: string;
  access_token: string;
}
export function loginByGoogle(req: GoogleLoginRequest) {
  return Http.request<LoginData>({
    url: `${API_END_POINT}/social/oauth/google`,
    method: 'POST',
    body: req,
  });
}

export function loginByFacebook(token: string) {
  return Http.request<LoginData>({
    url: `${API_END_POINT}/social/oauth/facebook`,
    method: 'POST',
    body: {access_token: token},
  });
}

export function loginByDiscord(token: string) {
  return Http.request<LoginData>({
    url: `${API_END_POINT}/social/oauth/discord`,
    method: 'POST',
    body: {access_token: token},
  });
}

export function loginBySteam(params: any) {
  return Http.request<LoginData>({
    url: `${API_END_POINT}/social/oauth/steam`,
    method: 'POST',
    body: params,
  });
}
