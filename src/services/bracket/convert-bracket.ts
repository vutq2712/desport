import { BracketData, MatchInfo, RoundInfo } from '@app/api/bracket/get-bracket';
import { Match, MatchStatus, ParticipantStatus } from '@app/dekits/bracket'

export interface MatchCustomData {
  match: MatchInfo;
  round: RoundInfo;
}

/**
 * Convert bracket data into graph data.
 */
export function convertBracket(bracketData: BracketData) {
  const rounds = bracketData.bracket.data.reverse();
  const bracketGraph: Match[] = [];

  rounds.forEach((round) => {
    round.matches.forEach((match) => {
      const team1Score = match.scores.reduce((p, c, idx) => p + match.scores[idx].team1, 0);
      const team2Score = match.scores.reduce((p, c, idx) => p + match.scores[idx].team2, 0);

      // any is temp, data structure will be changed.
      const data: Match<MatchCustomData> = {
        id: match._id,
        customData: {
          match,
          round: round.round,
        },
        nextMatchId: match.next_match,
        tournamentRoundText: `${round.round.index}`,
        startTime: '',
        state: match.status,
        participants: [
          {
            id: match.team1?._id,
            resultText: `${team1Score}`,
            isWinner: match.winner?._id === match.team1?._id,
            status: match.status === MatchStatus.WAITING ? undefined: ParticipantStatus.PLAYED,
            name: match.team1?.tag,
          },
          {
            id: match.team2?._id,
            resultText: `${team2Score}`,
            isWinner: match.winner?._id === match.team2?._id,
            status: match.status === MatchStatus.WAITING ? undefined: ParticipantStatus.PLAYED,
            name: match.team2?.tag,
          },
        ]
      };

      bracketGraph.push(data);

    });
  });

  return bracketGraph;
}
