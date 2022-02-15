import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface AccountData {
  _id: string;
  profile_name: string;
}

export interface MyProfilesParams {
  game: string;
}

export function myProfiles(params: MyProfilesParams) {
  return Http.request<AccountData[]>({
    method: 'GET',
    url: `${API_END_POINT}/user-game-profile/my-profiles?game=${params.game}`,
  });
}
