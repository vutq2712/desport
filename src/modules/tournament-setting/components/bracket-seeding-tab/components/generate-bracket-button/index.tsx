import { generateBracket } from '@app/api/bracket/generate-bracket';
import { Button } from '@app/dekits/button';
import { TournamentTabKeys } from '@app/modules/tournament-setting/services/sidebar';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSubscription } from '@app/hooks/subscription';

export function GenerateBracketButton() {
  const router = useRouter();
  const subscription = useSubscription();

  const handleGenerateBracket = useCallback(() => {
    const tournamentId = router.query.tournamentId;
    const bracketUUID = router.query.bracketUUID as string;
    const generateBracketSub = generateBracket({ bracket: bracketUUID as string }).subscribe({
      complete: () => {
        const bracketHref =
          `/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.BRACKET_DETAIL}&bracketUUID=${bracketUUID}`;

        router.push(bracketHref);
      }
    });

    subscription.add(generateBracketSub);
  }, []);

  return (
    <Button onClick={handleGenerateBracket}>Generate bracket</Button>
  )
}
