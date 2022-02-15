import { GameData } from '@app/api/user-game-profile/my-games';
import { SimpleNotice } from '@app/dekits/components/simple-notice';
import { useMemo, useState } from "react";
import { ConfigGame } from "./config-game";
import GameTabContext from './context/game-tab-context';
import { MyGames } from "./game-tab/my-games";
import { MyProfiles } from './game-tab/my-profiles';

export function ProfileGame() {
  const [gameActive, changeGameActive] = useState<GameData | {}>({});
  const gameActiveMemo = useMemo(() => ({ gameActive, profiles: {} }), [gameActive]);

  const onChangeGameActive = (game: GameData) => {
    changeGameActive(game);
  }
  return (
    <div className='de-profile-block mb-5'>
      <div className='de-px-xl-8 de-px-4'>
        <SimpleNotice message='Connect your game account to DESPORT to start your journey.' />
        <GameTabContext.Provider value={gameActiveMemo}>
          <div className='de-game-tabs'>
            <MyGames onChangeGameActive={onChangeGameActive} />
            <ConfigGame />
          </div>
          <MyProfiles />
        </GameTabContext.Provider>
      </div>
    </div>
  )
}
