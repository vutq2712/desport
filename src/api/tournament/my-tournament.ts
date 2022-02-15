import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface myTournamentData {
  _id: string;
  name: string;
  avatar: string;
}

export function myTournament(page: number, limit: number) {
  return Http.request<myTournamentData[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/my-tournament?page=${page}&limit=${limit}`,
  });
}
