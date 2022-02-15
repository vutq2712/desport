import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface MemberInfoData{
  _id: string,
  email: string,
  username: string,
  name: string,
  avatar: string
}

export interface TeamData {
  _id: string;
  uuid: string;
  name: string;
  tag: string;
  logo: string;
  banner: string;
  captain: string;
  members: MemberInfoData[];
}

export interface userSearchInfo {
  _id: string;
  username: string;
  avatar: string;
}

export interface searchUserNotInTeamParams{
  key_search: string,
  team_id: string
}

export function myTeams() {
  return Http.request<TeamData[]>({
    method: 'GET',
    url: `${API_END_POINT}/user-game-profile/my-teams`,
  });
}


export function getUserNotInTeamByUserName(params: searchUserNotInTeamParams){
  return Http.request<userSearchInfo[]>({
    method: 'POST',
    url: `${API_END_POINT}/team/search`,
    body: params
  });
}