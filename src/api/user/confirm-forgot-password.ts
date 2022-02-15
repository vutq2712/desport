import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface ConfirmForgotPasswordParams {
  user_id: string;
  numberVerify: string;
  password: string;
  confirmPassword: string;
}

export function confirmForgotPassword(params: ConfirmForgotPasswordParams) {
  return Http.request({
    url: `${API_END_POINT}/user/confirm-forgot-password`,
    method: 'POST',
    body: params,
  });
}
