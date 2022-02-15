import { API_END_POINT } from '@app/const/common.const';
import { Http } from '@app/services/http';

interface Score {
  // index: number,
  team1: number;
  team2: number;
  // winner: null
}

export interface UpdateScoreParams {
  scores: Score[];
  winner: string | null,
  // isFinal: boolean,
  match: string;
}

export function updateScore(params: UpdateScoreParams) {
  const newParams = {
    ...params,
    scores: params.scores.map((score, idx) => ({ ...score, index: idx + 1 })),
    isFinal: !!params.winner,
  }

  return Http.request({
    url: `${API_END_POINT}/single-elimination/update-score`,
    method: 'POST',
    body: newParams,
  });
}
