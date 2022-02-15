import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';
import { BracketFormat, BracketStatus } from '@app/types/bracket.type';
import { NumericDictionaryIteratee } from 'cypress/types/lodash';

export interface BracketMatchesParams{
  bracket_id: string,
  page?: number,
  limit?: number,
  team?: string,
  status?: string
}

export interface TeamData{
  _id: string,
  name: string,
  logo:string
}

export interface MatchInfoData {
_id: string,
  index: string,
  team1?: TeamData,
  team2?: TeamData,
  winner: string,
  loser: string,
  status: string,
  final_score:{
    team1: number,
    tema2: number,
  }
}
export interface MatchesData {
  total: number,
  page_num: number,
  page_size: number,
  matches: MatchInfoData[]
}


export function getMatchesOfBracket(params: BracketMatchesParams) {
  return Http.request<MatchesData>({
    url: `${API_END_POINT}/tournament/matches`,
    method: 'POST',
    body: params,
  });
}
