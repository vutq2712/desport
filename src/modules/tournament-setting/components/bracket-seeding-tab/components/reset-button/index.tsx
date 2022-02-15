import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { resetBracket } from '@app/api/bracket/reset-bracket';
import { Button } from '@app/dekits/button';
import { useSubscription } from '@app/hooks/subscription';

interface ResetButtonProps {
  onResetSuccess: () => void;
}

export function ResetButton(props: ResetButtonProps) {
  const router = useRouter();
  const subscription = useSubscription();

  const handleReset = useCallback(() => {
    const resetBracketSub = resetBracket({
      bracket: router.query.bracketUUID as string,
    }).subscribe({
      next: () => {
        props.onResetSuccess();
      }
    });

    subscription.add(resetBracketSub);
  }, [router]);

  return (
    <Button onClick={handleReset}>Reset</Button>
  )
}
