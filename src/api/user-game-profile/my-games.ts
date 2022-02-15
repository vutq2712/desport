import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface GameData {
  _id: string;
  uuid: string;
  name: string;
  logo: string;
}

export function myGames() {
  return Http.request<GameData[]>({
    method: 'GET',
    url: `${API_END_POINT}/user-game-profile/my-games`,
  });
}
