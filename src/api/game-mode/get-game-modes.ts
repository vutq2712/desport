import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface GameModesData {
  _id: string;
  uuid: string;
  [key: string]: any;
}

export function getGameModes() {
  return Http.request<GameModesData[]>({
    method: 'GET',
    url: `${API_END_POINT}/game-mode/list?status=A`,
  });
}
