import { Swiper, SwiperSlide } from 'swiper/react';
import { AttendingTeam } from "@app/dekits/components/attending-team";
import 'swiper/css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSubscription } from '@app/hooks/subscription';
import { getTeamJoin, TeamJoinData } from '@app/api/tournament/overview/get-team-join';
import { TournamentTabKeys } from '@app/modules/tournament/services/sidebar';

export function TournamentAttendingTeams() {
  const [teams, changeTeams] = useState<TeamJoinData[]>([]);
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const sub = getTeamJoin(router.query.tournamentId as string).subscribe({
      next: res => {
        changeTeams(res.data);
      },
      error: error => alert(error?.response?.msg || 'Error'),
    })

    subscription.add(sub);
  }, [])

  return (
    <div className='tournament-attending-teams de-mb-5'>
      <div className='de-card'>
        <div className='de-card-header'>
          <div className='de-card-title'>Attending teams</div>
          <button
            type='button'
            onClick={() => router.push(`/tournament/${router.query.tournamentId}?tab=${TournamentTabKeys.TEAMS}`)}
            className='de-btn de-btn-sm de-btn-primary'
          >
            <span>View all</span>
          </button>
        </div>
        <div className='de-card-body'>
          <Swiper className='de-attending-teams-slide'
            spaceBetween={64}
            slidesPerView={'auto'}
          >
            {teams.map((team, index) => (
              <SwiperSlide key={index}>
                <AttendingTeam logo={team.logo} name={team.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
