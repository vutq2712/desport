import { API_END_POINT } from '@app/const/common.const';
import { MatchStatus } from '@app/dekits/bracket';
import { Http } from '@app/services/http';
import { BracketStatus, BracketFormat } from '@app/types/bracket.type';

export interface GetBracketParams {
  bracketUUID: string;
}

export interface BracketMode {
  mode: string;
  data: {
    enable_3rd_vs_4th: boolean;
    _id: string;
    uuid: string;
    bracket: string;
    game: string;
    tournament: string;
    game_per_round: number;
    final_round: number;
    organizer: string;
    prizepool: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}

export interface BracketInfo {
  input_from_bracket: {
    isEnable: boolean;
  };
  team_limit: boolean;
  teams: any[];
  rounds: string[];
  status: BracketStatus;
  _id: string;
  uuid: string;
  name: string;
  game: string;
  tournament: string;
  start_date: string;
  top_team_from_brackets: number;
  max_teams: 4;
  mode: string;
  format: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  single_elimination: string;
}

export interface RoundInfo {
  teams: any[];
  matches: any[];
  winners: any[];
  losers: any[];
  _id: string;
  uuid: string;
  title: string;
  index: number;
  bracket: string;
  tournament: string;
  game: string;
  bracket_mode: string; // 
  matches_num: number;
  previous_round?: string;
  next_round?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ScoreData {
  index: number;
  team1: number;
  team2: number;
  winner?: string;
  _id: string;
}

export interface TeamInfo {
  logo: string;
  tag: string;
  uuid: string;
  _id: string;
}

export interface MatchInfo {
  team_members1: any[];
  team_members2: any[];
  _id: string;
  uuid: string;
  index: number;
  game: string;
  team1?: TeamInfo;
  team2?: TeamInfo;
  round: string;
  bracket: string;
  next_match?: string;
  tournament: string;
  time: any;
  /** UUID */
  winner: {
    uuid: string;
    _id: string;
  };
  loser: any;
  description: any;
  status: MatchStatus;
  __v: number;
  createdAt: string;
  updatedAt: string;
  scores: ScoreData[];
}

export interface BracketRound {
  round: RoundInfo;
  matches: MatchInfo[];
}

export interface BracketWrapperData {
  bracket: BracketInfo;
  data: BracketRound[];
}

export interface BracketData {
  bracketMode: BracketMode;
  bracket: BracketWrapperData;
}

export function getBracket(params: GetBracketParams) {
  return Http.request<BracketData>({
    url: `${API_END_POINT}/bracket/details/${params.bracketUUID}`,
    method: 'GET',
  });
}
