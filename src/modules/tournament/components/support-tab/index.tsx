import {useTournamentContext} from "@app/modules/tournament/context/tournament-context";

export function SupportTab() {
  const tournamentCtx = useTournamentContext();

  return (
    <div className='tournament-support'>
      <div className='de-card'>
        <div className='de-card-header'>
          <div className='de-card-title'>Support</div>
          <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>
            <span>Collapse</span>
          </button>
        </div>
        <div className='de-card-body'>
          <div className='tournament-overview-description'>
            {/*{tournamentCtx.supporters}*/}
          </div>
        </div>
      </div>
    </div>
  )
}
