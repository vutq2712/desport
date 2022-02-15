import { createContext, useContext } from 'react';
import { GameData } from '@app/api/user-game-profile/my-games';
import { AccountData } from '@app/api/user-game-profile/my-profiles';

interface IGameTabContext {
  gameActive: GameData | {};
  profiles: AccountData | {};
}

const GameTabContext = createContext<any>({
  gameActive: {},
  profiles: {},
})
GameTabContext.displayName = 'GameTabContext';

export const useGameTabContext = () => useContext(GameTabContext);

export default GameTabContext;
