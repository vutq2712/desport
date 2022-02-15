import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';
import { BracketStatus, BracketFormat } from '@app/types/bracket.type';

export interface ListBracketParams {
  tournamentId: string;
}

export interface BracketData {
  input_from_bracket: {
    isEnable: boolean;
  },
  /** TODO: add type */
  teams: any[];
  status: BracketStatus;
  _id: string;
  name: string;
  /** ISO 8601 */
  start_date: string;
  top_team_from_brackets: number;
  /** TODO: add type */
  mode: any;
  format: BracketFormat;
}

export function listBracket(params: ListBracketParams) {
  return Http.request<BracketData[]>({
    url: `${API_END_POINT}/bracket?tournament=${params.tournamentId}`,
    method: 'GET',
  });
}
