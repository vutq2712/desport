import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface SearchTeamInBracketParams {
  /** UUID */
  bracket: string;
  key_search: string;
}

export interface TeamInBracket {
  accepted: boolean
  isSeed: boolean;
  logo: string;
  name: string;
  uuid: string;
  _id: string;
}

export function searchTeamInBracket(params: SearchTeamInBracketParams) {
  return Http.request<TeamInBracket[]>({
    url: `${API_END_POINT}/bracket/seeding/team/search`,
    method: 'POST',
    body: params,
  });
}
