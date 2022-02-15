import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface CreateBracketParams {
  name: string;
  start_date: string;
  input_from_bracket: boolean;
  apply_team_from_bracket?: string;
  top_team_from_brackets?: number;
  tournament: string;
  game_per_round: number;
  final_round: number;
  team_limit: boolean;
  max_teams: number;
  enable_3rd_vs_4th: boolean;
}

export function createBracket(params: CreateBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/create`,
    method: 'POST',
    body: params,
  });
}
