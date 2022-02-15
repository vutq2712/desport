import { Button } from '@app/dekits/button';
import { openModal, ModalProps } from '@app/dekits/modal';
import { FormWrapper, Input } from '@app/dekits/form'
import { useCallback, useMemo } from 'react';
import { autoSeed } from '@app/api/bracket/auto-seed';
import { useRouter } from 'next/router';
import { useSubscription } from '@app/hooks/subscription';

interface AutoSeedFormValues {
  seed_number: number;
}

function AutoSeedModal(props: ModalProps) {
  const subscription = useSubscription();
  const { modalRef } = props;
  const router = useRouter();
  const initialValues = useMemo<AutoSeedFormValues>(() => ({ seed_number: 1 }), []);

  const handleAutoSeed = useCallback((values: AutoSeedFormValues) => {
    const bracketUUID = router.query.bracketUUID as string;
    const autoSeedSub = autoSeed({ bracket: bracketUUID, seed_num: values.seed_number })
      .subscribe({
        complete: () => {
          modalRef.close(true);
        }
      });

    subscription.add(autoSeedSub);
  }, []);

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={handleAutoSeed}
      className='modal-body'
    >
      <div className='modal-title'>Number of seed</div>

      <div className='d-flex pb-4 pt-4'>
        <Input name='seed_number' type='number' min={1} /> <Button type='submit'>Set</Button>
      </div>

      <div className='modal-actions d-flex justify-content-center'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
      </div>
    </FormWrapper>
  )
}

interface AutoSeedButtonProps {
  onSeedingSuccess: () => void;
}

export function AutoSeedButton(props: AutoSeedButtonProps) {
  const openAutoSeedModal = useCallback(() => {
    const autoSeedModalRef = openModal(AutoSeedModal);

    autoSeedModalRef.afterClosed().subscribe(data => {
      if (!data) return;

      props.onSeedingSuccess();
    })
  }, []);

  return (
    <Button onClick={openAutoSeedModal}>Auto seed</Button>
  )
}
