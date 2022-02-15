import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface EditTeamParams {
  /** UUID */
  team_id: string;
  tag: string;
  country: string;
}

export function editTeam(params: EditTeamParams) {
  return Http.request({
    url: `${API_END_POINT}/team/edit`,
    method: 'PUT',
    body: params,
  });
}
