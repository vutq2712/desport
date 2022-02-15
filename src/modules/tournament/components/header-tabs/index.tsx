import Link from 'next/link';
import { useRouter } from 'next/router';
import { TournamentTabKeys } from '../../services/sidebar';

export function TournamentTabs(props) {
  const router = useRouter();
  const { tournamentId } = router.query;

  return (
    <nav className='nav de-top-navigation de-mb-7' id='HomeNav'>
      <div className='scrollspy mb-0 de-top-navigation-menu'>
        <Link href={`/tournament/${tournamentId}?tab=${TournamentTabKeys.OVERVIEW}`}>
          <a className={`nav-link de-category-tab-item ${props.activeTab === TournamentTabKeys.OVERVIEW ? 'active' : ''}`}>
            <span>Overview</span>
          </a>
        </Link>
        <Link href={`/tournament/${tournamentId}?tab=${TournamentTabKeys.BRACKETS}`}>
          <a className={`nav-link de-category-tab-item ${props.activeTab === TournamentTabKeys.BRACKETS ? 'active' : ''}`}>
            <span>Brackets</span>
          </a>
        </Link>
        <Link href={`/tournament/${tournamentId}?tab=${TournamentTabKeys.MATCHES}`}>
          <a className={`nav-link de-category-tab-item ${props.activeTab === TournamentTabKeys.MATCHES ? 'active' : ''}`}>
            <span>Matches</span>
          </a>
        </Link>
        <Link href={`/tournament/${tournamentId}?tab=${TournamentTabKeys.SUPPORT}`}>
          <a className={`nav-link de-category-tab-item ${props.activeTab === TournamentTabKeys.SUPPORT ? 'active' : ''}`}>
            <span>Support</span>
          </a>
        </Link>
        <Link href={`/tournament/${tournamentId}?tab=${TournamentTabKeys.TEAMS}`}>
          <a className={`nav-link de-category-tab-item ${props.activeTab === TournamentTabKeys.TEAMS ? 'active' : ''}`}>
            <span>Teams</span>
          </a>
        </Link>
      </div>
    </nav>
  )
}
