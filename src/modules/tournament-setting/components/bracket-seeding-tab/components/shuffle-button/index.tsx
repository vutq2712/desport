import { shuffleTeam } from '@app/api/bracket/shuffle-team';
import { Button } from '@app/dekits/button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSubscription } from '@app/hooks/subscription';

interface ShuffleButtonProps {
  onShuffleSuccess: () => void;
}

export function ShuffleButton(props: ShuffleButtonProps) {
  const router = useRouter();
  const subscription = useSubscription();

  const handleShuffle = useCallback(() => {
    const shuffleTeamSub = shuffleTeam({ bracket: router.query.bracketUUID as string }).subscribe({
      complete: () => {
        props.onShuffleSuccess();
      }
    });

    subscription.add(shuffleTeamSub);
  }, []);

  return (
    <Button onClick={handleShuffle}>Shuffle</Button>
  )
}
