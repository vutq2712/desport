import type { NextPage } from 'next';
import { PageWrapper } from '@app/dekits/layout';
import { useCallback, useState } from 'react';
import { GameTab } from './game-tab';
import { OverviewTab } from './overview-tab';

enum ProfileGameTab {
  GAME,
  OVERVIEW,
}

const tabs = {
  [ProfileGameTab.GAME]: <GameTab />,
  [ProfileGameTab.OVERVIEW]: <OverviewTab />,
}

export const ProfileGame: NextPage = () => {
  const metadata = {
    title: 'ProfileGame',
    description: 'Description - This is page blank',
    url: '/',
    canonical: '/',
    image: '/favicon.ico',
  };

  const [activeTab, setActiveTab] = useState(ProfileGameTab.GAME);
  const changeActiveTab = useCallback((activeTab) => {
    setActiveTab(activeTab);
  }, []);

  return (
    <PageWrapper metadata={metadata}>
      <button onClick={() => changeActiveTab(ProfileGameTab.OVERVIEW)} type='button'>overview</button>
      <button onClick={() => changeActiveTab(ProfileGameTab.GAME)}>game</button>

      {tabs[activeTab]}
    </PageWrapper>
  );
};
