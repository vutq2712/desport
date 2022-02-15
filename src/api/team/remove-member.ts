import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface RemoveMemberParams {
  /** UUID */
  team_id: string;
  member: string;
}

export function removeTeamMember(params: RemoveMemberParams) {
  return Http.request({
    url: `${API_END_POINT}/team/remove-member`,
    method: 'POST',
    body: params,
  });
}
