import {API_END_POINT} from '@app/const/common.const';
import {Http} from '@app/services/http';

export interface UpdateProfileParams {
  notification_tournament: boolean,
  notification_nextmatch: boolean,
  notification_news: boolean,
  name: string,
  country?: string,
  birthday: string,
}

export function updateProfile(params: UpdateProfileParams) {
  return Http.request({
    url: `${API_END_POINT}/user/profile/update-info`,
    method: 'PUT',
    body: params,
  });
}
