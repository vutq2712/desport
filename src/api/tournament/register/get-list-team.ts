import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface TeamData {
  members: Array<string>,
  isDeleted: boolean,
  _id: string,
  game: string,
  name: string,
  tag: string,
  country: string,
  logo: string,
  banner: string,
  captain: string,
  createdAt: string,
  updatedAt: string,
}

export function getListTeam(game: string) {
  return Http.request<TeamData[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/register/teams?game=${game}`,
  });
}
