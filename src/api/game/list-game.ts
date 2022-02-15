import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface GameData {
  _id: string;
  display_name: string;
  logo: string;
}

export function listGames() {
  return Http.request<GameData[]>({
    method: 'GET',
    url: `${API_END_POINT}/game/list?status=A`,
  });
}
