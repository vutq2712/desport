import { formatNumber } from "@app/dekits/utils/number-format";
import { useTournamentContext } from "@app/modules/tournament/context/tournament-context";

export function TournamentPrizePool() {
  const tournamentCtx = useTournamentContext();

  return (
    <div className='de-card de-card-highlight full-h'>
      <div className='de-card-header'>
        <div className='de-card-title'>Current Prize pool</div>
      </div>
      <div className='de-card-body'>
        <div className='tournament-prize-pool'>
          <span>{tournamentCtx.detail.prizepool[0]?.total ? formatNumber(tournamentCtx.detail.prizepool[0]?.total) : ''}</span>
          <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <ellipse opacity='0.2' cx='16' cy='15.9802' rx='16' ry='15.9531' fill='#E59C50' />
            <rect width='4.06734' height='4.06736' transform='matrix(0.708143 -0.706069 0.708143 0.706069 5.49585 15.9617)' fill='#E59C50' />
            <rect width='14.8174' height='4.0634' transform='matrix(0.708143 -0.706069 0.708143 0.706069 9.32236 19.777)' fill='#E59C50' />
            <rect width='14.8174' height='4.03049' transform='matrix(0.708143 -0.706069 0.708143 0.706069 13.1286 23.5793)' fill='#E59C50' />
            <rect width='9.45422' height='4.06736' transform='matrix(0.708143 -0.706069 0.708143 0.706069 9.33334 12.2048)' fill='#E59C50' />
          </svg>
        </div>
        <div className='tournament-prize-label'>Sponsors</div>
        <div className='tournament-prize-sponsors'>
          <span>5,000,000</span>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <ellipse opacity='0.2' cx='8' cy='8' rx='8' ry='8' fill='#E59C50' />
            <rect x='2.74792' y='7.99072' width='2.03665' height='2.03666' transform='rotate(-45 2.74792 7.99072)' fill='#E59C50' />
            <rect x='4.66116' y='9.90393' width='7.41954' height='2.03468' transform='rotate(-45 4.66116 9.90393)' fill='#E59C50' />
            <rect x='6.5643' y='11.8107' width='7.41954' height='2.0182' transform='rotate(-45 6.5643 11.8107)' fill='#E59C50' />
            <rect x='4.66666' y='6.10681' width='4.73404' height='2.03666' transform='rotate(-45 4.66666 6.10681)' fill='#E59C50' />
          </svg>
        </div>
        <div className='tournament-prize-label'>Crowdfund</div>
        <div className='tournament-prize-crowdfund'>
          <span>5,000,000</span>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <ellipse opacity='0.2' cx='8' cy='8' rx='8' ry='8' fill='#E59C50' />
            <rect x='2.74792' y='7.99072' width='2.03665' height='2.03666' transform='rotate(-45 2.74792 7.99072)' fill='#E59C50' />
            <rect x='4.66116' y='9.90393' width='7.41954' height='2.03468' transform='rotate(-45 4.66116 9.90393)' fill='#E59C50' />
            <rect x='6.5643' y='11.8107' width='7.41954' height='2.0182' transform='rotate(-45 6.5643 11.8107)' fill='#E59C50' />
            <rect x='4.66666' y='6.10681' width='4.73404' height='2.03666' transform='rotate(-45 4.66666 6.10681)' fill='#E59C50' />
          </svg>
        </div>
      </div>
    </div>
  )
}
