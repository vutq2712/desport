import React, { useCallback, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { ParticipateSelectCard } from '../participate-select-card';

function SelectParticipateModal(props: any) {
  const { modalRef } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className='modal-body de-p-3'>
      <div className='modal-sub-title de-mb-1'>Participated in</div>
      <div className='modal-title modal-title-2 de-mb-3' id='exampleModalLabel'>COD Mobile #3</div>
      <div className='modal-inner'>
        <div className='modal-note'>As:<span>VIRTUS PRO</span></div>
        <div className='de-mb-3 text-center'>With these team members:</div>
        <div className='de-participates de-mb-3'>
          <ParticipateSelectCard logo='/assets/images/avatar-2.png' name='Dash' selected={selectedIndex === 0} onSelect={() => setSelectedIndex(0)} online label='NGUYEN VAN ANH' captain />
          <ParticipateSelectCard logo='/assets/images/avatar-2.png' name='Dash' selected={selectedIndex === 1} onSelect={() => setSelectedIndex(1)} online label='Doan Van Tu' />
          <ParticipateSelectCard logo='/assets/images/avatar-2.png' name='Dash' selected={selectedIndex === 2} onSelect={() => setSelectedIndex(2)} label='Member' />
          <ParticipateSelectCard logo='/assets/images/avatar-2.png' name='Dash' selected={selectedIndex === 3} onSelect={() => setSelectedIndex(3)} online label='Doan Van Tu' />
          <ParticipateSelectCard logo='/assets/images/avatar-2.png' name='Dash' selected={selectedIndex === 4} onSelect={() => setSelectedIndex(4)} label='Member' />
        </div>
        <div className='de-participates-note'>
          <div>
            *Tournament Fee will be refunded if your team is not selected for participation.
          </div>
          <a href='#'>Claim on Wallet &gt; My Tournament</a>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn w-50' onClick={() => modalRef.close(false)}>CANCEL</button>
        <button type='button' disabled={selectedIndex === -1} className='de-btn de-btn-primary w-50' onClick={() => modalRef.close()}>
          <span>Confirm</span>
        </button>
      </div>
    </div>
  )
}

export function SelectParticipate() {
  const openSelectParticipate = useCallback(() => {
    openModal(SelectParticipateModal, { dialogClassName: 'de-modal-md' });
  }, []);

  return (
    <button className='de-btn de-btn-select' type='button' onClick={openSelectParticipate}>
      <span>Select</span>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M8.12 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.7 10.7001C6.31 10.3101 6.31 9.68006 6.7 9.29006C7.09 8.91006 7.73 8.90006 8.12 9.29006Z' fill='currentColor' />
      </svg>
    </button>
  )
}
