import React, { useEffect, useState } from 'react';
import { myGames as apiMyGames, GameData } from '@app/api/user-game-profile/my-games';
import { useSubscription } from '@app/hooks/subscription';
import { useGameTabContext } from '../context/game-tab-context';
import { GameSmallCard } from '@app/dekits/components/game-small-card';

interface IMyGames {
  onChangeGameActive: (args: any) => void;
}

export function MyGames({ onChangeGameActive }: IMyGames) {
  const subscription = useSubscription();
  const [games, changeGames] = useState<GameData[]>([]);
  const gameTabContext = useGameTabContext();
  const { gameActive } = gameTabContext;

  useEffect(() => {
    const sub = apiMyGames().subscribe(res => {
      if (res.code && res.code === 200 && res.data.length) {
        changeGames(res.data);
        onChangeGameActive(res.data[0])
      }
    })

    subscription.add(sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!!games.length && (
        <>
          {games.map(game => (
            <button type='button' onClick={() => onChangeGameActive(game)} key={game.uuid} className={`de-game-tab ${gameActive.uuid === game.uuid ? 'active' : ''}`}>
              <GameSmallCard logo={game.logo.startsWith('http') ? game.logo : ''} name={game.name} />
            </button>
          ))}
        </>
      )}
    </>
  )
}
