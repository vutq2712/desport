import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';
import { Tracing } from 'trace_events';

export interface SettingOperatingData {
  end_time: string,
  start_time: string,
  publish_status: string,
}

export interface SettingRegistrationData {
  fee: {
      is_require: boolean,
      currency: string,
      quantity: number,
  },
  end_time: string,
  start_time: string,
  roster_size: number,
  status: string | null
}

export interface SettingPrizePoolData {
  currency: string,
  total: number,
  allocated: number
}

export interface SettingData {
  operating: SettingOperatingData,
  registration: SettingRegistrationData,
  chain_id: number,
  supporters: Array<string>,
  operators: Array<string>,
  teams: Array<string>,
  teams_in_tournament: Array<string>,
  brackets: Array<string>,
  is_active: boolean,
  _id: string,
  name: string,
  organizer: {
    name: string,
    username: string,
    _id: string,
  },
  game_mode: string,
  createdAt: string,
  updatedAt: string,
  __v: 0,
  prizepool: SettingPrizePoolData[],
  info: string,
  avatar: string,
  game: {
    display_name: string,
    logo: string,
    name: string,
    _id: string,
  }
}

export function getSetting(_id: string) {
  return Http.request<SettingData>({
    method: 'GET',
    url: `${API_END_POINT}/tournament/detail?_id=${_id}`,
  });
}
