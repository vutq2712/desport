import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface ResetBracketParams {
  /** UUID */
  bracket: string;
}

export function resetBracket(params: ResetBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/reset`,
    method: 'POST',
    body: params,
  });
}
