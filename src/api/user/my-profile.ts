import {API_END_POINT} from '@app/const/common.const';
import {Http} from '@app/services/http';

export interface MyProfile {
  user_id: string;
  birthday: string;
  email: string;
  name: string;
  username: string;
  uuid: string;
  country: string;
  // ????
  wallet: any;
  notification_tournament: boolean,
  notification_nextmatch: boolean,
  notification_news: boolean,
  avatar?: string,
}

export function myProfile() {
  return Http.request<MyProfile>({
    url: `${API_END_POINT}/user/profile`,
    method: 'GET',
  });
}
