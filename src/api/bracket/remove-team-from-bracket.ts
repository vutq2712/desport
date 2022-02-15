import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface RemoveTeamFromBracketParams {
  /** UUID. */
  bracket:  string;
  /** UUID. */
  team: string;
}

export function removeTeamFromBracket(params: RemoveTeamFromBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/remove-team`,
    method: 'POST',
    body: params,
  });
}
