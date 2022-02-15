import Link from 'next/link';
import { useRouter } from 'next/router';
import { TournamentTabKeys } from '../../services/sidebar'
import { LivestreamTag } from '@app/dekits/components/livestream-tag';

export function Header() {
  const router = useRouter();
  const { tournamentId } = router.query;
  const tabFromQuery = router.query.tab as TournamentTabKeys || TournamentTabKeys.DASHBOARD;

  return (
    <>
      <div className='de-tournament-setting-header'>
        <div className='de-px-xl-8 de-px-4'>
          <div className='tournament-setting-card'>
            <div className='tournament-setting-image-wrap'>
              <div className='tournament-setting-image'>
                <img src='/assets/images/avatar-2.png' alt='' />
              </div>
            </div>
            <div className='tournament-setting-info'>
              <div><LivestreamTag /></div>
              <h4>New World Odyr</h4>
              <h1>north american cup #4</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='de-tournament-setting-menu'>
        <div className='de-px-xl-8 de-px-4'>
          <nav className='nav de-top-navigation p-0' id='TSettingNav'>
            <Link href={`/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.DASHBOARD}`}>
              <a className={`nav-link de-category-tab-item ${tabFromQuery === TournamentTabKeys.DASHBOARD ? 'active' : ''}`}>{t('tournament.dashboard_tab')}</a>
            </Link>
            <Link href={`/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.INFO_DETAIL}`}>
              <a className={`nav-link de-category-tab-item ${tabFromQuery === TournamentTabKeys.INFO_DETAIL ? 'active' : ''}`}>{t('tournament.info_detail_tab')}</a>
            </Link>
            <Link href={`/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.LIST_BRACKET}`}>
              <a className={`nav-link de-category-tab-item ${tabFromQuery === TournamentTabKeys.LIST_BRACKET || tabFromQuery === TournamentTabKeys.CREATE_BRACKET ? 'active' : ''}`}>{t('tournament.list_bracket_tab')}</a>
            </Link>
            <Link href={`/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.PRIZE_POOL}`}>
              <a className={`nav-link de-category-tab-item ${tabFromQuery === TournamentTabKeys.PRIZE_POOL ? 'active' : ''}`}>{t('tournament.prize_pool_tab')}</a>
            </Link>
            <Link href={`/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.SPONSOR}`}>
              <a className={`nav-link de-category-tab-item ${tabFromQuery === TournamentTabKeys.SPONSOR ? 'active' : ''}`}>{t('tournament.sponsor_tab')}</a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
