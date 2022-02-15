import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface GenerateBracketParams {
  /** UUID */
  bracket: string;
}

export function generateBracket(params: GenerateBracketParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/generate-bracket`,
    method: 'POST',
    body: params,
  });
}
