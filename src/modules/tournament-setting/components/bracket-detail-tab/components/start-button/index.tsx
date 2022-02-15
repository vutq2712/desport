import { changeBracketStatus, BracketAction } from '@app/api/bracket/change-bracket-status';
import { Button } from '@app/dekits/button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BracketStatus } from '@app/types/bracket.type';
import { useSubscription } from '@app/hooks/subscription';

interface StartButtonProps {
  onStartSuccess: (status: BracketStatus) => void;
  disabled: boolean;
}

export function StartButton(props: StartButtonProps) {
  const router = useRouter();
  const subscription = useSubscription();

  const handleStart = useCallback(() => {
    const startBracketSub = changeBracketStatus({
      bracket: router.query.bracketUUID as string,
      action: BracketAction.PUBLISH,
    }).subscribe({
      next: (res) => {
        props.onStartSuccess(res.data.new_status);
      }
    });

    subscription.add(startBracketSub);
  }, []);

  return (
    <Button disabled={props.disabled} onClick={handleStart}>Start</Button>
  )
}
