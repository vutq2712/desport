import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface ChangePasswordParams {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}

export function changePassword(params: ChangePasswordParams) {
  return Http.request({
    url: `${API_END_POINT}/user/profile/change-password`,
    method: 'PUT',
    body: params,
  });
}
