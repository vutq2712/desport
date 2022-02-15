import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface AddMemberParams {
  /** UUID */
  team_id: string;
  member: string;
}

export function addTeamMember(params: AddMemberParams) {
  return Http.request({
    url: `${API_END_POINT}/team/add-member`,
    method: 'POST',
    body: params,
  });
}
