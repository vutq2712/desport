import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RequestParams {
  _id: string, // _id of tournament
  operator: string, // _id of user
}

interface Data {}

export function addOperator(params: RequestParams) {
  return Http.request<Data>({
    url: `${API_END_POINT}/tournament/setting/search-user`,
    method: 'POST',
    body: params,
  });
}
