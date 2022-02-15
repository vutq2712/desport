import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface VerifyRequest {
  email: string;
  user_id: string;
  numberVerify: string;
}

export function verifyUser(params: VerifyRequest) {
  return Http.request({
    url: `${API_END_POINT}/user/verify-user`,
    method: 'POST',
    body: params,
  });
}
