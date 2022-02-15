import React, { useCallback, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { GameData } from '@app/api/game/list-game';
import { AddAccount as ConnectAccount } from '../add-account';

function ConnectSteam(props: { nextStep: () => void }) {
  return (
    <>
      <div className='modal-body'>
        connect steam
      </div>

      <div>You'll be redirect to the Steam Login page in order to complete this process</div>

      <div className='modal-footer'>
        <button type='button' className='btn btn-primary' onClick={props.nextStep}>Let's go</button>
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
    window.alert('Connect success');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='exampleModalLabel'>Modal title</h5>
        <button onClick={modalRef.close} type='button' className='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>

      {step === 'connectSteam' && <ConnectSteam nextStep={nextStep} />}
      {step === 'connectAccount' && <ConnectAccount gameId={data._id} onSuccess={onAddingSuccess} />}
    </div>
  )
}

export function AddAccount({ gameActive }: {gameActive: GameData}) {
  const onAddAccount = useCallback(() => {
    openModal(AccountGameModal, {
      data: gameActive
    });
  }, [gameActive]);

  return (
    <div>
      <button type='button' onClick={onAddAccount}>+ Add account</button>
    </div>
  )
}
