import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface ShuffleTeamParams {
  /** UUID */
  bracket: string;
}

export function shuffleTeam(params: ShuffleTeamParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/shuffle`,
    method: 'POST',
    body: params,
  });
}
