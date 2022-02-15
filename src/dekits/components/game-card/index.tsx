import React from 'react';
import { GameAccount } from './game-account';
import { GameLogo } from './game-logo';
import { GameStatsCard } from './game-stats';

export function GameCard(props: any) {
  return (
    <div className='de-game-card w-100'>
      <GameLogo />
      <div className='game-info'>
        <GameAccount data={props.data} />
        <GameStatsCard />
      </div>
    </div>
  )
}
