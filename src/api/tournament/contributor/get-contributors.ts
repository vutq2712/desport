import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface ContributorsRequest {
  tournament: string,
  page: number,
  limit: number,
}

export interface ContributorInfo {
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

export interface ContributorData {
  contributors: ContributorInfo[],
  total: number,
  page_num: string,
  page_size: string,
}

export function getContributors({
  tournament,
  page,
  limit,
}: ContributorsRequest) {
  return Http.request<ContributorData>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/contributors?tournament=${tournament}&page=${page}&limit=${limit}`,
  });
}
