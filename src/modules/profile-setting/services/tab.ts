import dynamic from 'next/dynamic';

export enum ProfileSettingTabs {
  OVERVIEW = 'overview',
  FRIENDS = 'friends',
  TEAMS = 'teams',
  GAMES = 'games',
  WALLET = 'wallet',
  SETTINGS = 'settings',
}

const ProfileTabsMap = {
  [ProfileSettingTabs.OVERVIEW]: dynamic(() => import('../components/overview').then(m => m.ProfileOverview as any)),
  [ProfileSettingTabs.FRIENDS]: dynamic(() => import('../components/friends').then(m => m.ProfileFriends as any)),
  [ProfileSettingTabs.TEAMS]: dynamic(() => import('../components/teams').then(m => m.ProfileTeams as any)),
  [ProfileSettingTabs.GAMES]: dynamic(() => import('../components/games').then(m => m.ProfileGame as any)),
  [ProfileSettingTabs.WALLET]: dynamic(() => import('../components/wallet').then(m => m.ProfileWallet as any)),
  [ProfileSettingTabs.SETTINGS]: dynamic(() => import('../components/settings').then(m => m.ProfileSettings as any)),
}

export function specifyTabKey(rawTabKey: any): ProfileSettingTabs {
  if (!ProfileTabsMap[rawTabKey]) {
    return ProfileSettingTabs.OVERVIEW;
  }

  return rawTabKey;
}

export function getTabComponent(tab: ProfileSettingTabs) {
  return ProfileTabsMap[tab];
}

// add translation later
export function getTabButtons() {
  return [
    { label: 'Overview', tabKey: ProfileSettingTabs.OVERVIEW },
    { label: 'Friends', tabKey: ProfileSettingTabs.FRIENDS },
    { label: 'Teams', tabKey: ProfileSettingTabs.TEAMS },
    { label: 'Games', tabKey: ProfileSettingTabs.GAMES },
    { label: 'Wallet', tabKey: ProfileSettingTabs.WALLET },
    { label: 'Settings', tabKey: ProfileSettingTabs.SETTINGS },
  ];
}
