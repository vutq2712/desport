import { TournamentPrizeClaim } from "@app/modules/index/components/tournament-prize-claim";
import { TournamentRegisteredFeeRefund } from "@app/modules/index/components/tournament-prize-refund";
import { TournamentBanner } from "@app/dekits/components/tournament-banner";
import { OperatingStatus } from "@app/types/tournament.type";

export function TournamentDetail() {
  return (
    <div className='de-tournament-detail mb-5'>
      <TournamentBanner
        info={{
          tournamentName: 'tournamentName',
          gameName: 'gameName',
          organizerName: 'organizerName',
          timer: 'December 10 - 5.00 AM',
          location: 'Location',
          mediaLink: 'mediaLink',
          prizePool: {
            total: 1000000,
            unit: 'B-USD'
          },
          status: OperatingStatus.UPCOMING,
        }}
      />
      <div className='de-px-xl-8 de-px-4'>
        <div className='row'>
          <div className='col-lg-7'>
            <TournamentPrizeClaim />
            <TournamentRegisteredFeeRefund />
          </div>
        </div>
      </div>
    </div>
  )
}
