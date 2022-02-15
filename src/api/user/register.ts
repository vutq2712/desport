import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';
import { MailSubscribe } from '@app/types/user.type';

interface RegisterParams {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
  country?: string;
  dob: string;
  subscribe: MailSubscribe;
}

export interface RegisterData {
  user_id: string;
}

export function register(params: RegisterParams) {
  return Http.request<RegisterData>({
    url: `${API_END_POINT}/user/register`,
    method: 'POST',
    body: params,
  });
}
