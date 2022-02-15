import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface userSearchInfo {
  _id: string;
  name: string;
  username: string;
}

export interface searchUserNotInTeamParams{
  key_search: string,
  team_id: string
}
export function getUsersByUsername(key_search) {
  return Http.request<userSearchInfo[]>({
    method: 'POST',
    url: `${API_END_POINT}/user/search`,
    body: key_search
  });
}

