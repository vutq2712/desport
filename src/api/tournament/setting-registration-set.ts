import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RequestParams {
  _id: string;
  registration:{
    fee:{
      is_require: boolean,
      currency: string,
      quantity: number
    },
    roster_size: number,
    start_time: string,
    end_time: string
  }
}

export function settingRegistrationSet(params: RequestParams) {
  return Http.request({
    url: `${API_END_POINT}/tournament/setting/registration/set`,
    method: 'POST',
    body: params,
  });
}
