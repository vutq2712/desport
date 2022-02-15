import React, { useCallback, useEffect, useState } from 'react';
import { FormWrapper, Select, SelectOptions } from '@app/dekits/form';
import { myGames } from '@app/api/user-game-profile/my-games';
import { myProfiles, AccountData } from '@app/api/user-game-profile/my-profiles';
import { useSubscription } from '@app/hooks/subscription';


interface ProfileOverviewFormValues {
  game: string;
}

export function OverviewTab() {
  const subscription = useSubscription();
  const [gamesOptions, setGames] = useState<SelectOptions>([]);
  useEffect(() => {
    const myGamesSub = myGames().subscribe(
      res => {
        const defaultGame = res.data[0];

        setGames(res.data.map(game => ({
          label: game.name,
          value: game._id,
        })));

        defaultGame && getAccountGame(defaultGame._id);
      },
      err => { }
    );

    subscription.add(myGamesSub);
  }, [subscription]);

  const [profiles, setProfiles] = useState<AccountData[]>([]);
  const getAccountGame = useCallback((gameId) => {
    const myProfilesSub = myProfiles({ game: gameId }).subscribe(res => {
      setProfiles(res.data);
    });

    subscription.add(myProfilesSub);
  }, [subscription]);

  const onGameChange = useCallback((e) => {
    getAccountGame(e.target.value);
  }, [])

  return (
    <div>
      <FormWrapper<ProfileOverviewFormValues>
        initialValues={{ game: '' }}
        onSubmit={() => { }}
      >
        <Select name='game' options={gamesOptions} onChange={onGameChange} />

        {profiles.map(profile => (
          <div key={profile._id}>{profile.profile_name}</div>
        ))}
      </FormWrapper>
    </div>
  )
}
