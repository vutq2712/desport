import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface AutoSeedParams {
  /** UUID */
  bracket: string;
  seed_num: number;
}

export function autoSeed(params: AutoSeedParams) {
  return Http.request({
    url: `${API_END_POINT}/bracket/seeding/auto-seed`,
    method: 'POST',
    body: params,
  });
}
