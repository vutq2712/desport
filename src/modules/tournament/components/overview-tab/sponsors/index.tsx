import { SponsorCard } from "@app/dekits/components/sponsor-card";
import { useTournamentContext } from "@app/modules/tournament/context/tournament-context";

const mapColor = ['#B1B7E1', '#E59C50', '#954000'];

export function TournamentSponsors() {
  const tournamentCtx = useTournamentContext();

  return (
    <div className='tournament-sponsors'>
      <div className='tournament-section-title'>Sponsors</div>
      <div className='row de-px-12'>
        {!!tournamentCtx.sponsors.length && tournamentCtx.sponsors.map((sponsor, index) => (
          <div className='col-lg-4' key={sponsor._id}>
            <SponsorCard star={index + 1} color={mapColor[index] || mapColor[0]} name={sponsor.display_name} />
          </div>
        ))}
      </div>
    </div>
  )
}
