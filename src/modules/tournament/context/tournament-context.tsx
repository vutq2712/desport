import { createContext, useContext } from 'react';
import { SettingData } from "@app/api/tournament/get-setting";
import { OperatingStatus } from '@app/types/tournament.type';
import { SponsorData } from '@app/api/tournament/sponsor/get-sponsors';

interface TournamentContextProps {
  operatingStatus: OperatingStatus;
  detail: SettingData;
  sponsors: SponsorData[];
  hasLive: boolean;
  isBattleRoyal: boolean;
}

const TournamentContext = createContext<TournamentContextProps>({} as TournamentContextProps);
TournamentContext.displayName = 'TournamentContext';

export const useTournamentContext = () => useContext(TournamentContext);

export default TournamentContext;
