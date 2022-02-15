import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

export interface TransferCaptainParams {
  /** UUID */
  team_id: string;
  member: string;
}

export function transferCaptain(params: TransferCaptainParams) {
  return Http.request({
    url: `${API_END_POINT}/team/transfer-captain`,
    method: 'POST',
    body: params,
  });
}
