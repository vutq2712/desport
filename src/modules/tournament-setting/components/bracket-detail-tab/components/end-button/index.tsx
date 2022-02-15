import { changeBracketStatus, BracketAction } from '@app/api/bracket/change-bracket-status';
import { Button } from '@app/dekits/button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BracketStatus } from '@app/types/bracket.type';
import { useSubscription } from '@app/hooks/subscription';

interface EndButtonProps {
  onEndSuccess: (status: BracketStatus) => void;
  disabled: boolean;
}

export function EndButton(props: EndButtonProps) {
  const router = useRouter();
  const subscription = useSubscription();

  const handleEnd = useCallback(() => {
    const startBracketSub = changeBracketStatus({
      bracket: router.query.bracketUUID as string,
      action: BracketAction.FINISHED,
    }).subscribe({
      next: (res) => {
        props.onEndSuccess(res.data.new_status);
      }
    });

    subscription.add(startBracketSub);
  }, []);

  return (
    <Button disabled={props.disabled} onClick={handleEnd}>End</Button>
  )
}
