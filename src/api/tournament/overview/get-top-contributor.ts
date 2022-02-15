import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface TopContributorData {
  user_info: {
      _id: string,
      username: string,
      name: string,
      avatar: string,
  },
  total_amount: number,
  list_currency: Array<{
    currency: string,
    amount: number,
  }>
}

export function getTopContributor(tournament: string) {
  return Http.request<TopContributorData[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/top-contributor?tournament=${tournament}`,
  });
}
