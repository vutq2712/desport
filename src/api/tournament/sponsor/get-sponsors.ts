import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

export interface SponsorData {
  _id: string;
  avatar: string;
  display_name: string;
}

export function getSponsors(_id: string) {
  return Http.request<SponsorData[]>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/sponsors?_id=${_id}`,
  });
}
