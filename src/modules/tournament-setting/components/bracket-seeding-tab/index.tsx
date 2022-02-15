import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FormikProps } from 'formik';
import { searchTeamInBracket, TeamInBracket } from '@app/api/bracket/search-team-in-bracket';
import { SearchTeamForm, SearchTeamFormValues } from './components/search-team-form';
import { InviteButton } from './components/invite-button';
import { ResetButton } from './components/reset-button';
import { AutoSeedButton } from './components/auto-seed-button';
import { ShuffleButton } from './components/shuffle-button';
import { GenerateBracketButton } from './components/generate-bracket-button';
import { ListTeam } from './components/list-team';
import { useSubscription } from '@app/hooks/subscription';

export function BracketSeedingTab() {
  const router = useRouter();
  const searchTeamFormRef = useRef<FormikProps<never>>();
  const [listTeam, setListTeam] = useState<TeamInBracket[]>([]);
  const subscription = useSubscription();

  const handleSearchTeam = useCallback((params: SearchTeamFormValues) => {
    const bracketUUID = router.query.bracketUUID as string;
    const searchTeamInBracketSub = searchTeamInBracket({
      ...params,
      bracket: bracketUUID,
    }).subscribe({
      next: res => {
        setListTeam(res.data);
      },
    });

    subscription.add(searchTeamInBracketSub);
  }, []);

  const handleResetSearch = useCallback(() => {
    searchTeamFormRef.current?.resetForm();
    handleSearchTeam({ key_search: '' });
  }, []);

  useEffect(() => {
    handleSearchTeam({ key_search: '' });
  }, []);

  return (
    <>
      <div className='d-flex'>
        <SearchTeamForm formRef={searchTeamFormRef} onSearch={handleSearchTeam} />
        <InviteButton />
        <ResetButton onResetSuccess={handleResetSearch} />
        <ShuffleButton onShuffleSuccess={handleResetSearch} />
        <AutoSeedButton onSeedingSuccess={handleResetSearch} />
        <GenerateBracketButton />
      </div>

      <ListTeam listTeam={listTeam} />
    </>
  )
}
