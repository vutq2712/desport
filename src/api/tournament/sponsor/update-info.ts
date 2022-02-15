import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface UpdateInfoRequest {
  _id: string,
  info: string,
  avatar: string,
  display_name: string,
}


export function updateInfo(params: UpdateInfoRequest) {
  return Http.request({
    url: `${API_END_POINT}/tournament/sponsor/update-info`,
    method: 'POST',
    body: params,
  });
}
