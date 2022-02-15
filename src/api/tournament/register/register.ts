import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RegisterRequest {
  tournament: string,
  game: string,
  team_master: string,
  captain_profile: string,
  members: Array<string>,
  members_profile: Array<string>,
  email_contact: string,
  name_contact: string,
}

export function register(param: RegisterRequest) {
  return Http.request<string>({
    method: 'POST',
    url: `${API_END_POINT}/tournament/register/regist`,
    body: param,
  });
}
