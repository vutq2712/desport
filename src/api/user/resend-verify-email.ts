import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export function resendVerifyEmail(email: string) {
  return Http.request({
    url: `${API_END_POINT}/user/resend-verify-email`,
    method: 'POST',
    body: { email },
  });
}
