import Cookies from 'js-cookie';
import { JWT_ACCESS_TOKEN } from '@app/const/common.const';

interface UserCredentail {
  accessToken: string;
  expiredTime: number;
}

export function checkUserLogin() {
  return !!Cookies.get(JWT_ACCESS_TOKEN);
}

export function saveUserCredential(userCredential: UserCredentail) {
  Cookies.set(JWT_ACCESS_TOKEN, userCredential.accessToken, {
    expires: userCredential.expiredTime,
  });
}

export function getAccessToken() {
  return Cookies.get(JWT_ACCESS_TOKEN);
}

export function clearUserCredential() {
  Cookies.remove(JWT_ACCESS_TOKEN);
}
