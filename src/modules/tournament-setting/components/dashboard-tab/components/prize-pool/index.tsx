import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Subscription } from "rxjs";
import Link from "next/link";
import { TournamentTabKeys } from "@app/modules/tournament-setting/services/sidebar";
import { SettingPrizePoolData } from "@app/api/tournament/get-setting";
// import { useSubscription } from '@app/hooks/subscription';

export function PrizePool({
  listPrizePool,
}: {
  listPrizePool: SettingPrizePoolData[];
}) {
  const subscription = useMemo(() => new Subscription(), []);
  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  const router = useRouter();

  return (
    <div>
      <div className='de-card-header'>
        <div className='de-card-title'>PrizePool</div>
        <button type='button' className='de-btn de-btn-sm de-btn-secondary'>
          Distribute prizes
        </button>
      </div>
      <div className='de-card-body'>
        <div className='list'>
          {listPrizePool.map((item, idx) => (
            <div className='row mt-2' key={idx}>
              <div className='col-4'>Currency: {item.currency}</div>
              <div className='col-4'>Total: {item.total}</div>
              <div className='col-4'>Allocated: {item.allocated}</div>
            </div>
          ))}

          {!listPrizePool.length && (
            <>
              <div className='de-notice'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g opacity='0.6'>
                    <path d='M12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 17H11V15H13V17Z' fill='#E59C50' />
                  </g>
                </svg>
                <span>No prizepool</span>
              </div>

              <Link
                href={`/tournament-setting/${router.query.tournamentId}?tab=${TournamentTabKeys.PRIZE_POOL}`}
              >
                <a className='de-btn de-btn-sm de-btn-outline-secondary'>
                  {" "}
                  Add prizepool
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
