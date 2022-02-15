import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface DisbandParams{
  team_id: string
}

export function disbandTeam(params: DisbandParams) {
  return Http.request({
    url: `${API_END_POINT}/team/disband`,
    method: 'DELETE',
    body: params,
  });
}
