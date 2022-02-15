import React, { useCallback, useEffect, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { listGames, GameData } from '@app/api/game/list-game'
import { AddAccount } from '../add-account';

function PickGame(props: { nextStep: (gameId: string) => void }) {
  const [gameList, setGameList] = useState<GameData[]>([]);
  const [chosenGameId, setChosenGameId] = useState<string>();

  useEffect(() => {
    listGames().subscribe(res => {
      setGameList(res.data);
    })
  }, [])

  const selectGame = useCallback(gameId => {
    setChosenGameId(gameId);
  }, []);

  const handleContinue = useCallback(() => {
    props.nextStep(chosenGameId as string);
  }, [chosenGameId])

  return (
    <>
      <div className='modal-body'>
        {gameList.map((game, idx) => (
          <label key={idx}>
            <input onClick={() => selectGame(game._id)} type='checkbox' value='' /> {game.display_name}
          </label>
        ))}

      </div>

      <div className='modal-footer'>
        <button
          disabled={!chosenGameId}
          type='button'
          className='btn btn-primary'
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  )
}

function ConfigGameModal(props: any) {
  const { modalRef } = props;
  const [step, setStep] = useState('pickGame');
  const [chosenGameId, setChosenGameId] = useState('');

  const nextStep = useCallback(gameId => {
    setChosenGameId(gameId)
    setStep('addAccount');
  }, []);

  const onAddingSuccess = useCallback(() => {
    modalRef.close();
    window.alert('Adding success');
  }, []);

  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='exampleModalLabel'>Modal title</h5>
        <button onClick={modalRef.close} type='button' className='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>

      {step === 'pickGame' && <PickGame nextStep={nextStep} />}
      {step === 'addAccount' && <AddAccount gameId={chosenGameId} onSuccess={onAddingSuccess} />}
    </div>
  )
}

export function ConfigGame() {
  const configGame = useCallback(() => {
    openModal(ConfigGameModal);
  }, []);

  return (
    <button className='btn btn-primary' type='button' onClick={configGame}>Config game</button>
  )
}
