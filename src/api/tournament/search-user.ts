import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RequestParams {
  name: string,
  page: number,
  limit: number,
}

export interface SearchUserData {
  _id: string,
  username: string,
  avatar?: string
}

export function searchUser(params: RequestParams) {
  return Http.request<SearchUserData[]>({
    url: `${API_END_POINT}/tournament/setting/search-user`,
    method: 'POST',
    body: params,
  });
}
