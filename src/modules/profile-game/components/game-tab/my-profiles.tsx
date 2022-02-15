import React, { useEffect, useState } from 'react';
import { myProfiles as apiMyProfiles, AccountData } from '@app/api/user-game-profile/my-profiles';
import { useSubscription } from '@app/hooks/subscription';
import { useGameTabContext } from '../../context/game-tab-context';
import { AddAccount } from './add-account';


export function MyProfiles() {
  const subscription = useSubscription();
  const [profiles, changeProfiles] = useState<AccountData[]>([]);
  const gameTabContext = useGameTabContext();
  const { gameActive } = gameTabContext;

  useEffect(() => {
    if (!gameActive._id) return;

    const sub = apiMyProfiles({game: gameActive._id}).subscribe(res => {
      if (res.code && res.code === 200 && res.data.length) {
        changeProfiles(res.data);
      }
    })

    subscription.add(sub);
  }, [gameActive, subscription])

  return (
    <div className='list-profiles'>
      <AddAccount gameActive={gameActive} />

      {!!profiles.length && (
        <ul className='list-inline list-unstyled'>
          {profiles.map(profile => (
            <li key={profile._id}>
              <span className='name'>{profile.profile_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
