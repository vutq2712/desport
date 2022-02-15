import { useRouter } from 'next/router';
import { PageWrapper } from '@app/dekits/layout';
import { TournamentTabKeys, isValidTournamentTab } from './services/sidebar';
import { Header } from './components/header';
import { DashboardTab } from './components/dashboard-tab';
import { InfoDetailTab } from './components/info-detail-tab';
import { CreateBracketTab } from './components/create-bracket-tab';
import { BracketPreviewTab } from './components/bracket-preview-tab';
import { BracketSeedingTab } from './components/bracket-seeding-tab';
import { BracketDetailTab } from './components/bracket-detail-tab';
import { ListBracketTab } from './components/list-bracket-tab';
import { PrizePoolTab } from './components/prize-pool-tab';
import { SponsorTab } from './components/sponsor-tab';
import { EditBracketTab } from './components/edit-bracket-tab';

const TabMap = {
  [TournamentTabKeys.DASHBOARD]: DashboardTab,
  [TournamentTabKeys.INFO_DETAIL]: InfoDetailTab,
  [TournamentTabKeys.LIST_BRACKET]: ListBracketTab,
  [TournamentTabKeys.CREATE_BRACKET]: CreateBracketTab,
  [TournamentTabKeys.BRACKET_EDIT]: EditBracketTab,
  [TournamentTabKeys.BRACKET_PREVIEW]: BracketPreviewTab,
  [TournamentTabKeys.BRACKET_SEEDING]: BracketSeedingTab,
  [TournamentTabKeys.BRACKET_DETAIL]: BracketDetailTab,
  [TournamentTabKeys.PRIZE_POOL]: PrizePoolTab,
  [TournamentTabKeys.SPONSOR]: SponsorTab,
}

export function TournamentSetting() {
  const router = useRouter();
  const tabFromQuery = router.query.tab as TournamentTabKeys;
  const activeTab = isValidTournamentTab(tabFromQuery) ? tabFromQuery : TournamentTabKeys.DASHBOARD;
  const TabContent = TabMap[activeTab];

  const metadata = {
    title: `${t('tournament.tournament_setting_title')} - ${t(`tournament.${activeTab}`)}`,
    description: 'TournamentSetting',
    url: '/auth/forgotPassword',
  };

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-tournament-setting-page'>
        <Header />
        <div className='de-px-xl-8 de-px-4'>
          <TabContent />
        </div>
      </div>
    </PageWrapper>
  );
};
