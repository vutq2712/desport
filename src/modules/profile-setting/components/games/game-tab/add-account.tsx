import React, { useCallback, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { GameData } from '@app/api/game/list-game';
import { AddAccount as ConnectAccount } from '../config-game/add-account';
import { ConnectedModal } from '../result-modal/connected-successfully';
import { GameSmallCard } from '@app/dekits/components/game-small-card';

function ConnectSteam(props: { nextStep: () => void, onDismiss: () => void }) {
  return (
    <>
      <div className='modal-inner'>
        <div className='text-center pt-2 mt-1'>
          <GameSmallCard logo='/assets/images/lol-icon.png' name='LoL' bordered />
        </div>
        <div className='connect-game-info text-center'>
          <img src='/assets/images/steam.png' height='96px' />
          <h4>Connect Steam</h4>
          <div>You'll be redirected to the Steam Login page in order to complete this process.</div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={props.onDismiss} className='de-btn'>CANCEL</button>
        <button type='button' onClick={props.nextStep} className='de-btn de-btn-primary w-100'>
          <span>let's go</span>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z' fill='white' />
          </svg>
        </button>
      </div>
    </>
  )
}

function AccountGameModal(props: any) {
  const { modalRef, data } = props;
  const [step, setStep] = useState('connectSteam');

  const nextStep = useCallback(() => {
    setStep('connectAccount');
  }, []);

  const onAddingSuccess = useCallback(() => {
    modalRef.close();
    openModal(ConnectedModal);
    // window.alert('Connect success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='modal-body'>
      <div className='modal-title'>Connect Account</div>
      {
        step === 'connectSteam' &&
        <ConnectSteam
          nextStep={nextStep}
          onDismiss={() => modalRef.close()} />
      }
      {
        step === 'connectAccount' &&
        <ConnectAccount
          gameName='LoL'
          gameIcon='/assets/images/lol-icon.png'
          gameId={data._id}
          onSuccess={onAddingSuccess}
          onReturn={() => setStep('connectSteam')} />
      }
    </div>
  )
}

export function AddAccount({ gameActive }: { gameActive: GameData }) {
  const onAddAccount = useCallback(() => {
    openModal(AccountGameModal, {
      data: gameActive
    });
  }, [gameActive]);

  return (
    <div className='col-lg-6'>
      <button className='de-game-add-account' type='button' onClick={onAddAccount}>
        <div className='de-btn-add-account'>
          <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12.5 16.99C12.3011 16.99 12.1103 16.911 11.9697 16.7703C11.829 16.6297 11.75 16.4389 11.75 16.24V8.23999C11.75 8.04108 11.829 7.85031 11.9697 7.70966C12.1103 7.56901 12.3011 7.48999 12.5 7.48999C12.6989 7.48999 12.8897 7.56901 13.0303 7.70966C13.171 7.85031 13.25 8.04108 13.25 8.23999V16.24C13.25 16.4389 13.171 16.6297 13.0303 16.7703C12.8897 16.911 12.6989 16.99 12.5 16.99Z' fill='white' />
            <path d='M16.5 12.99H8.49997C8.31725 12.9688 8.1487 12.8812 8.02636 12.7438C7.90402 12.6065 7.83643 12.4289 7.83643 12.245C7.83643 12.0611 7.90402 11.8835 8.02636 11.7462C8.1487 11.6088 8.31725 11.5212 8.49997 11.5H16.5C16.6989 11.5 16.8896 11.579 17.0303 11.7197C17.171 11.8603 17.25 12.0511 17.25 12.25C17.25 12.4489 17.171 12.6397 17.0303 12.7803C16.8896 12.921 16.6989 13 16.5 13V12.99Z' fill='white' />
            <path d='M12.5001 21.94C12.3668 21.941 12.2356 21.9065 12.1201 21.84L4.37006 17.37C4.25823 17.302 4.16557 17.2066 4.10083 17.0929C4.0361 16.9792 4.00141 16.8508 4.00006 16.72V7.76997C3.99844 7.63852 4.03186 7.50902 4.09689 7.39478C4.16192 7.28054 4.25621 7.18568 4.37006 7.11997L12.1201 2.63997C12.2347 2.57604 12.3638 2.54248 12.4951 2.54248C12.6263 2.54248 12.7554 2.57604 12.8701 2.63997L20.6201 7.11997C20.7365 7.18356 20.8334 7.27767 20.9003 7.3922C20.9673 7.50672 21.0018 7.63732 21.0001 7.76997V16.77C20.9986 16.902 20.9628 17.0314 20.8962 17.1453C20.8296 17.2593 20.7344 17.354 20.6201 17.42L12.8701 21.89C12.7537 21.9403 12.6256 21.9576 12.5001 21.94ZM5.50006 16.28L12.5001 20.28L19.5001 16.28V8.19997L12.5001 4.19997L5.50006 8.19997V16.28Z' fill='white' />
          </svg>
          <span>Add account</span>
        </div>
        <div className='de-game-add-placeholder'>
          <div className='username-placeholder'>

          </div>
          <div className='stats-placeholder'>

          </div>
        </div>
      </button>
    </div>
  )
}
