import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface ForgotPasswordParams {
  email: string;
}

export interface ForgotPasswordData {
  user_id: string;
}

export function forgotPassword(params: ForgotPasswordParams) {
  return Http.request<ForgotPasswordData>({
    url: `${API_END_POINT}/user/forgot-password`,
    method: 'POST',
    body: params,
  });
}
