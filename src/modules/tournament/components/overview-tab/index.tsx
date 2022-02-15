import { TournamentOverview } from "./overview";
import { TournamentSponsors } from "./sponsors";
import { TournamentContributors } from "./contributors";
import { TournamentPrizePool } from './prize-pool';
import { TournamentPrizeDistribution } from './prize-distribution';
import { TournamentAttendingTeams } from './attending-teams';

export function OverviewTab() {
  return (
    <>
      <TournamentOverview />
      <TournamentSponsors />
      <TournamentContributors />
      <div className='tournament-prize'>
        <div className='row de-gx-3'>
          <div className='col-lg-4'>
            <TournamentPrizePool />
          </div>
          <div className='col-lg-8'>
            <TournamentPrizeDistribution />
          </div>
        </div>
      </div>
      <TournamentAttendingTeams />
    </>
  )
}
