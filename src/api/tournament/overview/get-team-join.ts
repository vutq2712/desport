import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface TeamJoinData {
  _id: string,
  name: string,
  tag: string,
  logo: string
}

export function getTeamJoin(tournament: string) {
  return Http.request<TeamJoinData[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/team-join?tournament=${tournament}`,
  });
}
