import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface MembersProfileRequest {
  game: string,
  members: Array<string>,
}

export interface MemberProfileData {
  _id: {
    _id: string,
    username: string,
    name: string,
    avatar: string,
  },
  profileInfo: Array<{
    _id: string,
    profile_name: string,
  }>,
}

export function getMembersProfile(param: MembersProfileRequest) {
  return Http.request<MemberProfileData[]>({
    method: 'POST',
    url: `${API_END_POINT}/tournament/register/members-profile`,
    body: param,
  });
}
