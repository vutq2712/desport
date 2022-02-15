export enum TournamentTabKeys {
  DASHBOARD = 'dashboard_tab',
  INFO_DETAIL = 'info_detail_tab',
  LIST_BRACKET = 'list_bracket_tab',
  CREATE_BRACKET = 'create_bracket_tab',
  BRACKET_PREVIEW = 'bracket_preview',
  BRACKET_SEEDING = 'bracket_seeding',
  BRACKET_EDIT = 'bracket_edit',
  BRACKET_DETAIL = 'bracket_detail',
  PRIZE_POOL = 'prize_pool_tab',
  SPONSOR = 'sponsor_tab',
}

const validTournamentTabs = Object.values(TournamentTabKeys);

export function isValidTournamentTab(tab: TournamentTabKeys) {
  return validTournamentTabs.includes(tab);
}
