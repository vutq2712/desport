import { Button } from '@app/dekits/button';
import { openModal, ModalProps } from '@app/dekits/modal';
import { FormWrapper, Input} from '@app/dekits/form'
import { useCallback, useMemo } from 'react';

function InviteLinkModal(props: ModalProps) {
  const { modalRef } = props;
  const initialValues = useMemo(() => ({ link: 'https://yo...'}), []);
  const handleCopyInviteLink = useCallback(() => {
    navigator.clipboard.writeText(initialValues.link);
  }, [])

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={() => {}}
      className='modal-body'
    >
      <div className='modal-title'>Invitation link</div>

      <div className='d-flex pb-4 pt-4'>
        <Input name='link'/> <Button onClick={handleCopyInviteLink}>Copy</Button>
      </div>

      <div className='modal-actions d-flex justify-content-center'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
      </div>
    </FormWrapper>
  )
}

export function InviteButton() {
  const openInviteLinkModal = useCallback(() => {
    openModal(InviteLinkModal)
  }, []);

  return (
    <Button onClick={openInviteLinkModal}>Invite</Button>
  )
}
