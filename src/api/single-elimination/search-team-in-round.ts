import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface Score {
  // index: number,
  team1: number;
  team2: number;
  // winner: null
}

export interface SearchTeamInRoundParams {
  key_search?: string;
  /** UUID. */
  round: string;
}

export interface TeamData {
  uuid: string,
  logo: string,
  tag: string,
  name: string,
  match: string,
  status: any
}

export function searchTeamInRound(params: SearchTeamInRoundParams) {
  return Http.request<TeamData[]>({
    url: `${API_END_POINT}/single-elimination/search-team-to-change-match`,
    method: 'POST',
    body: params,
  });
}
