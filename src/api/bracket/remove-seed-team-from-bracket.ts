import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface RemoveSeedTeamFromBracketParams {
  /** UUID. */
  bracket:  string;
  /** UUID. */
  team: string;
}

export function removeSeedTeamFromBracket(params: RemoveSeedTeamFromBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/remove-seed`,
    method: 'POST',
    body: params,
  });
}
