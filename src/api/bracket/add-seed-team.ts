import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface AddSeedTeamToBracketParams {
  /** UUID. */
  bracket:  string;
  /** UUID. */
  team: string;
}

export function addSeedTeamToBracket(params: AddSeedTeamToBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/add-seed`,
    method: 'POST',
    body: params,
  });
}
