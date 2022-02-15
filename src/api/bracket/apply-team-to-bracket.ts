import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface ApplyTeamToBracketParams {
  /** UUID. */
  bracket:  string;
  /** UUID. */
  team: string;
}

export function applyTeamToBracket(params: ApplyTeamToBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/apply-team`,
    method: 'POST',
    body: params,
  });
}
