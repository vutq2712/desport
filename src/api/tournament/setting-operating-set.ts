import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RequestParams {
  _id: string;
  start_time: string;
  end_time: string;
}

export function settingOperatingSet(params: RequestParams) {
  return Http.request({
    url: `${API_END_POINT}/tournament/setting/operating/set`,
    method: 'POST',
    body: params,
  });
}
