import {API_END_POINT} from '@app/const/common.const'
import {Http} from '@app/services/http';


export interface TeamMemberInfo {
    role: string;
    uuid: string;
    email: string;
    username: string;
    name: string;
}

export interface TeamInfoData {
    _id: string;
    team_master: string;
    uuid: string;
    game: string;
    name: string;
    tag: string;
    country: string;
    logo: string;
    banner: string;
    members: TeamMemberInfo[];
}

export function getParticipateTeams(tournament_id: string, search: string) {
  return Http.request<TeamInfoData[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/info/teams?tournament=${tournament_id}&search=${search}`,
  });
}
