import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';
import { BracketStatus } from '@app/types/bracket.type'

/**
 * ??????????
 */
export enum BracketAction {
  PUBLISH = 'P',
  HIDE = 'H',
  FINISHED = 'F',
}

export interface SearchTeamInBracketParams {
  /** UUID */
  bracket: string;
  action: BracketAction;
}

export interface BracketStatusInfo {
  old_status: BracketStatus;
  new_status: BracketStatus;
}


export function changeBracketStatus(params: SearchTeamInBracketParams) {
  return Http.request<BracketStatusInfo>({
    url: `${API_END_POINT}/bracket/change-status`,
    method: 'POST',
    body: params,
  });
}
