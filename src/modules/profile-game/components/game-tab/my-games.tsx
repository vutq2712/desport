import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { myGames as apiMyGames, GameData } from '@app/api/user-game-profile/my-games';
import { useSubscription } from '@app/hooks/subscription';
import { useGameTabContext } from '../../context/game-tab-context';

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
    <div className='list-game'>
      {!!games.length && (
        <ul className='list-inline list-unstyled'>
          {games.map(game => (
            <li
              key={game.uuid}
              className={gameActive.uuid === game.uuid ? 'active' : ''}
            >
              <button onClick={() => onChangeGameActive(game)} type='button'>
                { game.logo.startsWith('http') && <Image src={game.logo} alt={game.name} width={40} height={40} /> }
                <span className='name'>{game.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
