import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';
import { BracketFormat, BracketStatus } from '@app/types/bracket.type';

export interface BracketInfo {
  bracket_info: {
    status: BracketStatus,
    _id: string,
    name: string,
    start_date: string,
    mode: BracketFormat,
    single_elimination: string
  },
  bracket_prize: {
    _id: string,
    prizepool: [
      {
        currency: string,
        amount: number,
      }
    ]
  }
}

export function getBracketsOfTour(_id: string) {
  return Http.request<BracketInfo[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/brackets?_id=${_id}`,
  });
}
