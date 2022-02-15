import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RequestParams {
  _id: string;
}

export function deleteTournament(params: RequestParams) {
  return Http.request({
    url: `${API_END_POINT}/tournament/setting/registration/stop`,
    method: 'POST',
    body: params,
  });
}
