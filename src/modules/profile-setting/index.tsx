import { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { PageWrapper } from '@app/dekits/layout';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ProfileHeader } from './components/header';
import { ProfileSettingTabs, specifyTabKey, getTabComponent, getTabButtons } from './services/tab';

export const ProfileSetting: NextPage = () => {
  const metadata = {
    title: 'Profile setting',
    description: 'Description - This is page blank',
    url: '/',
    canonical: '/',
    image: '/favicon.ico',
  };

  const router = useRouter();
  const selectedTabKey = specifyTabKey(router.query.tab);
  const handleChangeTab = useCallback((tab: ProfileSettingTabs) => () => {
    router.push(`/profile-setting?tab=${tab}`);
  }, [router]);

  const tabButtons = useMemo(() => getTabButtons(), []);
  const TabComponent = getTabComponent(selectedTabKey);

  return (
    <PageWrapper metadata={metadata}>
      <ProfileHeader />

      <div className='de-profile-menu'>
        <div className='de-px-2'>
          <nav className='nav de-top-navigation p-0' id='HomeNav'>
            {tabButtons.map((btn, idx) => (
              <button
                key={idx}
                type='button'
                onClick={handleChangeTab(btn.tabKey)}
                className={clsx(`nav-link de-category-tab-item`, {
                  'active': selectedTabKey === btn.tabKey,
                  'ms-auto': idx === tabButtons.length - 1,
                })}
              >
                <span>{btn.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <TabComponent />
    </PageWrapper>
  );
};
