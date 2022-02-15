import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';


export function checkBattleRoyal(_id: string) {
  return Http.request<boolean>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/check-battle-royal?tournament=${_id}`,
  });
}
