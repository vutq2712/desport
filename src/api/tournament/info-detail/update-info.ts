import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface UpdateInfoRequest {
  _id: string,
  info: string,
  avatar: string,
}


export function updateInfo(params: UpdateInfoRequest) {
  return Http.request({
    url: `${API_END_POINT}/tournament/info/update`,
    method: 'POST',
    body: params,
  });
}
