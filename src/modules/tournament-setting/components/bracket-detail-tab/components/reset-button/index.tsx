import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { resetBracket } from '@app/api/bracket/reset-bracket';
import { Button } from '@app/dekits/button';
import { TournamentTabKeys } from '@app/modules/tournament-setting/services/sidebar';
import { useSubscription } from '@app/hooks/subscription';

interface ResetButtonProps {
  disabled: boolean;
}

export function ResetButton(props: ResetButtonProps) {
  const router = useRouter();
  const subscription = useSubscription();

  const handleReset = useCallback(() => {
    const resetBracketSub = resetBracket({
      bracket: router.query.bracketUUID as string,
    }).subscribe({
      next: () => {
        const bracketPreviewHref = `/tournament-setting/${router.query.tournamentId}` +
          `?tab=${TournamentTabKeys.BRACKET_PREVIEW}&bracketUUID=${router.query.bracketUUID}`;

        router.push(bracketPreviewHref);
      }
    });

    subscription.add(resetBracketSub);
  }, [router]);

  return (
    <Button disabled={props.disabled} onClick={handleReset}>Reset</Button>
  )
}
