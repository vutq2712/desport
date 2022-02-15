import React, { useState, useMemo } from 'react';
import { GameData } from '@app/api/user-game-profile/my-games';
import { Header } from './components/game-tab/header';
import { MyGames } from './components/game-tab/my-games';
import GameTabContext from './context/game-tab-context';
import { MyProfiles } from './components/game-tab/my-profiles';

export function GameTab() {
  const [gameActive, changeGameActive] = useState<GameData | {}>({});
  const gameActiveMemo = useMemo(() => ({ gameActive, profiles: {} }), [gameActive]);

  const onChangeGameActive = (game: GameData) => {
    changeGameActive(game);
  }

  return (
    <GameTabContext.Provider value={gameActiveMemo}>
      <div className='game-tab'>
        <Header />

        <MyGames onChangeGameActive={onChangeGameActive} />

        <MyProfiles />
      </div>
    </GameTabContext.Provider>
  )
}
