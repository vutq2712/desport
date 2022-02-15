export enum TournamentTabKeys {
  OVERVIEW = 'overview_tab',
  BRACKETS = 'brackets_tab',
  MATCHES = 'matches_tab',
  SUPPORT = 'support_tab',
  TEAMS = 'teams_tab',
  LIVESTREAM = 'livestream_tab',
  CONTRIBUTE = 'contribute_tab',
  REGISTER = 'register_tab',
}

const validTournamentTabs = Object.values(TournamentTabKeys);

export function isValidTournamentTab(tab: TournamentTabKeys) {
  return validTournamentTabs.includes(tab);
}
