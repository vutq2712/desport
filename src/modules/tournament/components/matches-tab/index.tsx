
import { useTournamentContext } from "@app/modules/tournament/context/tournament-context";

export function MatchesTab() {

  const tournamentCtx = useTournamentContext();

  console.log("ctx", tournamentCtx);

  return (
    <div>
      matches
    </div>
  )
}
