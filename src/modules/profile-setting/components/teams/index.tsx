import { MyTeamFullCard } from "@app/dekits/components/my-team-full-card";
import { CreateTeam } from "./create-team";
// import { TeamDetail } from "../../../team-detail";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { myTeams as myTeamsApi, TeamData} from '@app/api/user-team/my-teams';
import { useRouter } from 'next/router';
import { useSubscription } from '@app/hooks/subscription';
import { useSession } from '@app/hooks/session';
import { TeamInfo } from "@app/modules/tournament/components/teams-tab/team-info";

export function ProfileTeams() {
  const [myTeams, changeMyTeams] = useState<TeamData[]>([]);
  const router = useRouter();
  const subscription = useSubscription();
  const { userInfo } = useSession();
  
  const getMyTeams = useCallback(() => {
    const myTeamsApiSub = myTeamsApi().subscribe(res => {
      if (res.data) {
        changeMyTeams(res.data);
      }
    });
    subscription.add(myTeamsApiSub)
  }, [])

  useEffect(() => {
    getMyTeams();
  }, [])

  return (
    <>
      {userInfo && 
      <div className='de-profile-block mb-5'>
        <div className='de-px-xl-8 de-px-4'>
          <div className='de-mb-5'>
            <CreateTeam />
          </div>
          {myTeams.map((team, index) => <MyTeamFullCard isListingPage={true} onrefresh={() => getMyTeams()} readOnly={team.captain !== userInfo.user_id} showCollapse={index===0} key = {team._id} teamInfo={team} onViewDetail={() => router.push(`/team/team-detail/${team._id}`)} onEdit={() => router.push(`/team/team-edit/${team._id}`)} />)}
        </div>
      </div> 
      }
    </>
  )
}
