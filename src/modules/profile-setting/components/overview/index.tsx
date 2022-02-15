import { OverallStats } from './overall-stats';
import { MyTeams } from './my-teams';
import { UpcomingMatches } from './upcoming-matches';

export function ProfileOverview() {
  return (
    <div className='de-profile-block mb-5'>
      <div className='de-px-xl-8 de-px-4'>
        <div className='row'>
          <div className='col-lg-6'>
            <OverallStats />
          </div>
          <div className='col-lg-6'>
            <MyTeams />
          </div>
        </div>
        <UpcomingMatches/>
      </div>
    </div>
  )
}
