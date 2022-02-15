import React, { useEffect, useState } from 'react';
import { myProfiles as apiMyProfiles, AccountData } from '@app/api/user-game-profile/my-profiles';
import { useSubscription } from '@app/hooks/subscription';
import { AddAccount } from './add-account';
import { useGameTabContext } from '../context/game-tab-context';
import { GameCard } from '@app/dekits/components/game-card';

export function MyProfiles() {
  const subscription = useSubscription();
  const [profiles, changeProfiles] = useState<AccountData[]>([]);
  const gameTabContext = useGameTabContext();
  const { gameActive } = gameTabContext;

  useEffect(() => {
    if (!gameActive._id) return;

    const sub = apiMyProfiles({ game: gameActive._id }).subscribe(res => {
      if (res.code && res.code === 200 && res.data.length) {
        changeProfiles(res.data);
      }
    })

    subscription.add(sub);
  }, [gameActive, subscription])

  return (
    <div className='row de-gx-8 gx-lg-5'>
      {!!profiles.length && (
        <>
          {profiles.map(profile => (
            <div className='col-lg-6' key={profile._id}>
              <GameCard data={profile} />
            </div>
          ))}
        </>
      )}
      <AddAccount gameActive={gameActive} />
    </div>
  )
}
