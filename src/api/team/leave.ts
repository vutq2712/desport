import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export function leaveTeam(team_id: string) {
  return Http.request({
    url: `${API_END_POINT}/team/leave?team_id=${team_id}`,
    method: 'DELETE',
  });
}
