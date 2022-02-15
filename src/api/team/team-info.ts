import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';
import { StringSchema } from 'yup';
import { GameData } from '../game/list-game';
import { MemberInfoData } from '../user-team/my-teams';
export interface TeamData {
    _id: string;
    uuid: string;
    name: string;
    tag: string;
    country: string;
    logo: string;
    banner: string;
    memberInfo: MemberInfoData[];
    memberGameInfo: Array<{
      game: string,
      profile_name: string,
    }>;
    game: GameData[];
    captain: string;
    captainInfo: MemberInfoData;
    CaptainProfile: {
      game: string,
      profile_name: string,
    };
}

export function getTeamDetail(team_id: string) {
  return Http.request<TeamData>({
    method: 'GET',
    url: `${API_END_POINT}/team/id/${team_id}`,
  });
}
