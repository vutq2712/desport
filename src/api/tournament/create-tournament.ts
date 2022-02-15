import { API_END_POINT } from '@app/const/common.const'
import { Http } from '@app/services/http';

interface RequestParams {
  name: string;
  game_mode: string;
}

interface CreateTournamentData {
  game_mode: string;
  name: string;
  organizer: string;
  uuid: string;
}

export function createTournament(params: RequestParams) {
  return Http.request<CreateTournamentData>({
    url: `${API_END_POINT}/tournament/create`,
    method: 'POST',
    body: params,
  });
}
