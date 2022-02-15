import { MyTeamFullMembers } from "@app/dekits/components/my-team-full-card/team-member";
import { MyTeamFullStats } from "@app/dekits/components/my-team-full-card/team-stats";
import { MyTeamRequests } from "@app/dekits/components/my-team-requests";
import ListTournaments from "@app/modules/index/components/list-tournaments";
import { UpcomingMatches } from "../../profile-setting/components/overview/upcoming-matches";
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { getTeamDetail, TeamData } from "@app/api/team/team-info";
import { Subscription } from 'rxjs';
import { useSession } from '@app/hooks/session';
import { SetCaptain } from "../set-captain";
import { confirm } from '@app/dekits/modal'
import { disbandTeam } from "@app/api/team/disband";
import { ProfileSettingTabs } from '@app/modules/profile-setting/services/tab';
import { leaveTeam } from "@app/api/team/leave";

export function TeamDetail() {
  const router = useRouter();
  const [teamInfo, setTeamInfo] = useState<TeamData>();
  const subscription = useMemo(() => new Subscription(), []);
  const team_id = router.query.teamId as string;
  const { userInfo } = useSession();

  const getTeamInfo = useCallback(() => {
    const getDetail = getTeamDetail(team_id).subscribe(res => {
      if (res.data) {
        setTeamInfo(res.data);
      }
    });
    subscription.add(getDetail)
  }, [])

  useEffect(() => {
    if(team_id)
      getTeamInfo();
    if(teamInfo) subscription.unsubscribe();
  }, [teamInfo])
  
  const handleDisband = useCallback(() => {
    confirm({ content: `Are you sure you want to disband this team?` }).subscribe(answer => {
      if (!answer) return;

      disbandTeam({team_id: team_id}).subscribe(res => {
        if(res.code == 200)
          router.push(`/profile-setting?tab=${ProfileSettingTabs.TEAMS}`);
      })
    })
  }, []);

  const handleLeave = useCallback(() => {
    confirm({ content: `Are you sure you want to leave this team?` }).subscribe(answer => {
      if (!answer) return;
      
      leaveTeam(team_id).subscribe(res => {
        if(res.code == 200)
          getTeamInfo();
      },(error) => {
        alert(error?.msg || 'Error');
      })
    })
  }, [team_id]);

  return (
    <div className='de-team-detail-block mb-5'>
      <section className='de-team-banner' style={{backgroundImage: `url(${teamInfo?.banner})`}}>
        <div className='de-team-banner-inner' >
        </div>
      </section>
      <div className='de-px-xl-8 de-px-4'>
        <div className='de-team-full-card de-mb-4'>
          <div className='row'>
            <div className='col-xl-1 col-lg-2 col-md-3'>
              <div className='team-full-logo lg'>
                <img src={teamInfo?.logo} alt={teamInfo?.name} />
              </div>
            </div>
            <div className='col-xl-11 col-lg-2 col-md-9'>
              <div className='de-mb-3'>
                <div className='de-mb-3'>
                  <h2 className='team-full-name'>{teamInfo?.name}</h2>
                </div>
                {(teamInfo && userInfo && teamInfo?.captain === userInfo?.user_id ) ? <div className='de-team-detail-action de-mb-3'>
                  <button onClick={() => router.push(`/team/team-edit/${teamInfo?._id}`)} type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>
                    <span>Edit Profile</span>
                  </button>
                  <SetCaptain team_id={teamInfo._id} members={teamInfo.memberInfo }/>
                  <button type='button' onClick={handleDisband} className='de-btn de-btn-sm de-btn-outline-danger'>
                    <span>Disband</span>
                  </button>
                </div> : 
                (teamInfo?.memberInfo.find(i => i._id === userInfo?.user_id) ? 
                <button type='button' onClick={handleLeave} className='de-btn de-btn-sm de-btn-outline-danger'>
                  <span>Leave</span>
                </button> : "")
                }
              </div>
              <MyTeamFullStats />
            </div>
          </div>
        </div>
        <MyTeamFullMembers onrefresh={() => getTeamInfo()} isListingPage={false} team_id={team_id} members={teamInfo?.memberInfo} readOnly={teamInfo && !(teamInfo?.captain == userInfo?.user_id)} captain={teamInfo?.captain} />
        <MyTeamRequests /> 
        <UpcomingMatches single />
      </div>

      <ListTournaments title='Ongoing Tournaments' id='Ongoing' />
      <ListTournaments title='Upcoming Tournaments' id='Upcoming' />
      <ListTournaments title='Past Tournaments' id='Past' />
    </div>
  )
}
