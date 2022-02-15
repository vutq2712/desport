import { openModal, ModalProps } from ".";

interface ConfirmParams {
  // title?: any;
  content?: any;
}

function ConfirmModal(props: ModalProps<ConfirmParams>) {
  const { modalRef, data } = props;
  return (
    <div className='modal-body'>
      <div className='modal-title de-mb-4 -text-center'>
        Confirm
      </div>

      <div className='modal-inner-auto'>
        {data?.content}
      </div>

      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={() => modalRef.close(false)}>CANCEL</button>
        <button type='submit' className='de-btn de-btn-outline-primary w-100'  onClick={() => modalRef.close(true)}>OK</button>
      </div>
    </div>
  )
}

export function confirm(params: ConfirmParams) {
  return openModal(ConfirmModal, { data: params }).afterClosed();
}
