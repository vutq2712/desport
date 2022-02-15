import {TeamDetail} from "@app/modules/tournament/components/teams-tab/team-detail";
import {useCallback, useState} from "react";
import {TeamData} from "@app/api/team/team-info";
import {TeamListing} from "@app/modules/tournament/components/teams-tab/team-listing";
import {useRouter} from "next/router";
import {TournamentTabKeys} from "@app/modules/tournament/services/sidebar";


export function TeamsTab() {

  const router = useRouter();
  const [selectTeam, setSelectTeam] = useState<TeamData | null>(null);

  const tabFromQuery = router.query.tab as TournamentTabKeys;
  const teamFromQuery = router.query.team_id;

  const handleClickTeam = useCallback((team: TeamData) => {
    setSelectTeam(team);
  }, [selectTeam]);

  return (
    <div>
      {
        !teamFromQuery ? <TeamListing tab={tabFromQuery} handleClickTeam={handleClickTeam} /> : <TeamDetail team={selectTeam}  teamId={teamFromQuery as string} />
      }
    </div>
  )
}
