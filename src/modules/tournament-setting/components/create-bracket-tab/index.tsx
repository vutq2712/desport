import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react';
import { TournamentTabKeys } from '../../services/sidebar';
import { BracketForm, BracketFormValues, getInitialValues } from '../bracket-form'
import { createBracket } from '@app/api/bracket/create-bracket';
import { useSubscription } from '@app/hooks/subscription';

export function CreateBracketTab() {
  const router = useRouter();
  const subscription = useSubscription();

  const handleCreateBracket = useCallback((values: BracketFormValues) => {
    const createBracketSub = createBracket(values).subscribe(res => {
      const tournamentId = router.query.tournamentId;
      const bracketId = res.data.bracket.bracket._id;
      const bracketPreviewHref =
        `/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.BRACKET_PREVIEW}&bracketUUID=${bracketId}`;

      router.push(bracketPreviewHref);
    });

    subscription.add(createBracketSub);
  }, [router]);

  const initialValues = useMemo<BracketFormValues>(
    () => getInitialValues(router.query.tournamentId as string),
    [router],
  );

  return (
    <div className='de-ts-create-bracket'>
      <BracketForm
        initialFormValues={initialValues}
        onSubmit={handleCreateBracket}
      />
    </div>
  )
}
