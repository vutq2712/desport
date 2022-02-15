import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export function checkRegister(tournament: string) {
  return Http.request<boolean>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/check-register?tournament=${tournament}`,
  });
}
