import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { forkJoin } from 'rxjs';
import { PageWrapper } from '@app/dekits/layout';
import { TournamentTabKeys, isValidTournamentTab } from './services/sidebar';
import { TournamentTabs } from './components/header-tabs';
import { OverviewTab } from './components/overview-tab';
import { BracketsTab } from './components/brackets-tab';
import { MatchesTab } from './components/matches-tab';
import { SupportTab } from './components/support-tab';
import { TeamsTab } from './components/teams-tab';
import { TournamentBanner } from '@app/dekits/components/tournament-banner';
import { getSetting, SettingData } from "@app/api/tournament/get-setting";
import { useSubscription } from '@app/hooks/subscription';
import TournamentContext from './context/tournament-context';
import dayjs from 'dayjs';
import { OperatingStatus } from '@app/types/tournament.type';
import { getSponsors, SponsorData } from '@app/api/tournament/sponsor/get-sponsors';
import { LivestreamTab } from './components/livestream-tab';
import { ContributeTab } from './components/contribute-tab';
import { RegisterTab } from './components/register-tab';
import { TournamentBannerSimple } from '@app/dekits/components/tournament-banner-simple';
import { checkBattleRoyal } from '@app/api/tournament/check-battle-royal';

const TabMap = {
  [TournamentTabKeys.OVERVIEW]: OverviewTab,
  [TournamentTabKeys.BRACKETS]: BracketsTab,
  [TournamentTabKeys.MATCHES]: MatchesTab,
  [TournamentTabKeys.SUPPORT]: SupportTab,
  [TournamentTabKeys.TEAMS]: TeamsTab,
  [TournamentTabKeys.LIVESTREAM]: LivestreamTab,
  [TournamentTabKeys.CONTRIBUTE]: ContributeTab,
  [TournamentTabKeys.REGISTER]: RegisterTab
}

export function TournamentDetail() {
  const [tournamentDetail, changeTournamentDetail] = useState<SettingData>({} as SettingData);
  const [sponsors, changeSponsors] = useState<SponsorData[]>([]);
  const [isBattleRoyal, setIsBattleRoyal] = useState(false);
  const [loading, changeLoading] = useState<boolean>(true);
  const router = useRouter();
  const subscription = useSubscription();
  const tabFromQuery = router.query.tab as TournamentTabKeys;
  const activeTab = isValidTournamentTab(tabFromQuery) ? tabFromQuery : TournamentTabKeys.OVERVIEW;
  const TabContent = TabMap[activeTab];

  const metadata = useMemo(() => ({
    title: `Tournament detail - ${activeTab}`,
    description: 'Tournament Detail',
    url: '/tournament/1',
  }), [router]);

  useEffect(() => {
    const sub = forkJoin({
      detail: getSetting(router.query.tournamentId as string),
      sponsors: getSponsors(router.query.tournamentId as string),
      isBattleRoyal: checkBattleRoyal(router.query.tournamentId as string)
    }).subscribe(({detail, sponsors, isBattleRoyal}) => {
      changeTournamentDetail(detail.data);
      changeSponsors(sponsors.data);
      setIsBattleRoyal(isBattleRoyal.data);
      changeLoading(false);
    });

    subscription.add(sub);
  }, [])

  const getOperatingStatus = () => {
    const { operating } = tournamentDetail;
    // if (!operating ||
    //   !operating.publish_status ||
    //   !operating.start_time ||
    //   !operating.end_time ||
    //   (operating.publish_status !== 'P' && operating.publish_status !== 'C')
    // ) return OperatingStatus.STANDBY;

    if (operating?.start_time && dayjs().isBefore(operating.start_time)) {
      return OperatingStatus.UPCOMING;
    }

    if (operating?.start_time && dayjs(dayjs()).isAfter(operating.start_time) && dayjs().isBefore(operating.end_time)) {
      return OperatingStatus.ONGOING;
    }

    if (operating?.end_time && dayjs(operating.end_time).isAfter(dayjs())) {
      return OperatingStatus.FINISHED;
    }

    return OperatingStatus.UPCOMING;
  }

  const checkHasLive = () => {
    // TODO check has live
    const hasLive = true;
    return getOperatingStatus() === OperatingStatus.ONGOING && hasLive;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper metadata={metadata}>
      <TournamentContext.Provider value={{
        operatingStatus: getOperatingStatus(),
        detail: tournamentDetail,
        sponsors: sponsors,
        hasLive: checkHasLive(),
        isBattleRoyal: isBattleRoyal
      }}>
        {
          activeTab === TournamentTabKeys.REGISTER ? <>
            <TournamentBannerSimple
              sponsors={sponsors}
              info={{
                id: router.query.tournamentId as string,
                tournamentName: tournamentDetail.name,
                avatar: tournamentDetail.avatar,
              }} />
            <div className='tournament-detail'>
              <TabContent />
            </div>
          </> : <>
            <TournamentBanner
              showContribute
              sponsors={sponsors}
              info={{
                id: router.query.tournamentId as string,
                tournamentName: tournamentDetail.name,
                gameName: tournamentDetail.game?.name || '',
                organizerName: tournamentDetail.organizer?.name || '',
                timer: tournamentDetail.operating?.start_time ? dayjs(tournamentDetail.operating.start_time).format('DD/MM/YYYY HH:mm:ss') : '',
                location: 'Location',
                mediaLink: '/mediaLink',
                prizePool: {
                  total: tournamentDetail.prizepool[0]?.total || 0,
                  unit: tournamentDetail.prizepool[0]?.currency || '',
                },
                status: getOperatingStatus(),
                hasLive: checkHasLive(),
              }}
            />
            {activeTab !== TournamentTabKeys.LIVESTREAM ? <TournamentTabs activeTab={activeTab} /> : <></>}
            <div className='tournament-detail'>
              <div className='de-px-xl-8 de-px-4'>
                <TabContent />
              </div>
            </div>
          </>
        }
      </TournamentContext.Provider>
    </PageWrapper>
  );
};
