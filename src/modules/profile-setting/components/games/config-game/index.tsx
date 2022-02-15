import React, { useCallback, useEffect, useState } from 'react';
import { openModal } from '@app/dekits/modal';
import { listGames, GameData } from '@app/api/game/list-game'
import { AddAccount } from './add-account';
import { ConnectedModal } from '../result-modal/connected-successfully';

function PickGame(props: { nextStep: (gameId: string) => void, onDismiss: () => void }) {
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
      <div className='modal-inner'>
        <div className='connect-description'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.00005 8.51348C7.93359 8.51313 7.86786 8.49953 7.80671 8.47348C7.74585 8.45077 7.69108 8.41426 7.64672 8.36681C7.55308 8.27306 7.50049 8.14598 7.50049 8.01348C7.50049 7.88098 7.55308 7.75389 7.64672 7.66014C7.69295 7.61495 7.74721 7.57878 7.80671 7.55348C7.86775 7.52706 7.93354 7.51343 8.00005 7.51343C8.06655 7.51343 8.13235 7.52706 8.19338 7.55348C8.25288 7.57878 8.30714 7.61495 8.35338 7.66014C8.44701 7.75389 8.49961 7.88098 8.49961 8.01348C8.49961 8.14598 8.44701 8.27306 8.35338 8.36681C8.30901 8.41426 8.25425 8.45077 8.19338 8.47348C8.13224 8.49953 8.06651 8.51313 8.00005 8.51348Z' fill='white' />
            <path d='M11.3335 13.8601H4.6668C4.33512 13.8619 4.00639 13.7977 3.69978 13.6712C3.39317 13.5447 3.1148 13.3584 2.88088 13.1232C2.64697 12.8881 2.46218 12.6087 2.3373 12.3015C2.21241 11.9942 2.14992 11.6651 2.15346 11.3335V4.66678C2.15346 4.33735 2.21856 4.01117 2.34503 3.70699C2.4715 3.4028 2.65684 3.12661 2.8904 2.89429C3.12396 2.66196 3.40114 2.47809 3.70599 2.35324C4.01085 2.22839 4.33737 2.16503 4.6668 2.16678H11.3335C11.6629 2.16503 11.9894 2.22839 12.2943 2.35324C12.5991 2.47809 12.8763 2.66196 13.1099 2.89429C13.3434 3.12661 13.5288 3.4028 13.6552 3.70699C13.7817 4.01117 13.8468 4.33735 13.8468 4.66678V11.3335C13.8503 11.6651 13.7878 11.9942 13.663 12.3015C13.5381 12.6087 13.3533 12.8881 13.1194 13.1232C12.8855 13.3584 12.6071 13.5447 12.3005 13.6712C11.9939 13.7977 11.6651 13.8619 11.3335 13.8601ZM4.6668 3.16678C4.46869 3.16502 4.27221 3.20252 4.08868 3.27711C3.90515 3.35171 3.73821 3.46192 3.59751 3.60138C3.4568 3.74085 3.34512 3.9068 3.26891 4.08966C3.19269 4.27252 3.15346 4.46867 3.15346 4.66678V11.3335C3.14989 11.5338 3.1865 11.7328 3.26112 11.9188C3.33574 12.1047 3.44686 12.2739 3.58792 12.4162C3.72899 12.5585 3.89713 12.6711 4.08243 12.7473C4.26773 12.8236 4.46643 12.8619 4.6668 12.8601H11.3335C11.5338 12.8619 11.7325 12.8236 11.9178 12.7473C12.1031 12.6711 12.2713 12.5585 12.4123 12.4162C12.5534 12.2739 12.6645 12.1047 12.7391 11.9188C12.8138 11.7328 12.8504 11.5338 12.8468 11.3335V4.66678C12.8468 4.46867 12.8076 4.27252 12.7314 4.08966C12.6551 3.9068 12.5435 3.74085 12.4028 3.60138C12.2621 3.46192 12.0951 3.35171 11.9116 3.27711C11.7281 3.20252 11.5316 3.16502 11.3335 3.16678H4.6668Z' fill='#8B5CE4' />
          </svg>
          <span className='active'>Pick a game</span>
          <svg width='48' height='1' viewBox='0 0 48 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <line y1='0.5' x2='48' y2='0.5' stroke='#5062E5' strokeDasharray='4 4' />
          </svg>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M6.36018 7.33337C6.29343 7.33419 6.22718 7.32164 6.16535 7.29645C6.10352 7.27126 6.04736 7.23395 6.00018 7.1867C5.95499 7.14046 5.91882 7.0862 5.89352 7.0267C5.86693 6.96572 5.85331 6.89989 5.85352 6.83337C5.85531 6.75435 5.87582 6.67688 5.91335 6.60731C5.95088 6.53775 6.00437 6.47808 6.06943 6.43319C6.13448 6.3883 6.20926 6.35947 6.28761 6.34907C6.36597 6.33867 6.44567 6.347 6.52018 6.37337C6.57968 6.39867 6.63395 6.43484 6.68018 6.48003C6.77398 6.57371 6.82673 6.7008 6.82685 6.83337C6.82706 6.89989 6.81344 6.96572 6.78685 7.0267C6.73679 7.1474 6.64088 7.2433 6.52018 7.29337C6.46956 7.31583 6.41543 7.32937 6.36018 7.33337Z' fill='white' />
            <path d='M8.9734 10.0001C8.84079 10.0001 8.71362 9.94737 8.61985 9.85361C8.52608 9.75984 8.4734 9.63266 8.4734 9.50005C8.46329 9.436 8.46329 9.37077 8.4734 9.30672C8.5011 9.24692 8.53951 9.19269 8.58674 9.14672C8.6311 9.09927 8.68587 9.06276 8.74674 9.04005C8.80664 9.0138 8.87133 9.00024 8.93674 9.00024C9.00214 9.00024 9.06683 9.0138 9.12673 9.04005C9.19035 9.06109 9.24766 9.09777 9.2934 9.14672C9.33859 9.19296 9.37477 9.24722 9.40007 9.30672C9.42665 9.3677 9.44027 9.43353 9.44007 9.50005C9.43995 9.63262 9.3872 9.75971 9.2934 9.85339C9.24586 9.90013 9.1891 9.93646 9.12673 9.96005C9.07842 9.98242 9.02649 9.99596 8.9734 10.0001Z' fill='white' />
            <path d='M11.1935 13.86H4.52681C4.19401 13.8636 3.86385 13.8006 3.55569 13.6749C3.24753 13.5492 2.96757 13.3632 2.73223 13.1279C2.4969 12.8926 2.31092 12.6126 2.1852 12.3044C2.05949 11.9963 1.99657 11.6661 2.00014 11.3333V4.66665C2.00014 4.00361 2.26354 3.36772 2.73238 2.89888C3.20122 2.43004 3.8371 2.16665 4.50014 2.16665H11.1668C11.4974 2.16312 11.8253 2.22518 12.1317 2.34924C12.4381 2.4733 12.7169 2.65689 12.9518 2.88938C13.1868 3.12188 13.3734 3.39867 13.5007 3.70374C13.628 4.0088 13.6935 4.33609 13.6935 4.66665V11.3333C13.697 11.6639 13.6349 11.9918 13.5109 12.2982C13.3868 12.6046 13.2032 12.8834 12.9707 13.1183C12.7382 13.3533 12.4614 13.5399 12.1564 13.6672C11.8513 13.7945 11.524 13.86 11.1935 13.86ZM4.52681 3.19331C4.32982 3.18978 4.13406 3.22509 3.95072 3.29722C3.76738 3.36936 3.60004 3.47691 3.45827 3.61373C3.3165 3.75054 3.20307 3.91395 3.12447 4.09461C3.04586 4.27528 3.00361 4.46965 3.00014 4.66665V11.3333C3.00014 11.7311 3.15818 12.1127 3.43948 12.394C3.72079 12.6753 4.10232 12.8333 4.50014 12.8333H11.1668C11.3638 12.8333 11.5588 12.7945 11.7408 12.7191C11.9228 12.6438 12.0882 12.5333 12.2275 12.394C12.3668 12.2547 12.4772 12.0893 12.5526 11.9073C12.628 11.7254 12.6668 11.5303 12.6668 11.3333V4.66665C12.6668 4.46966 12.628 4.27461 12.5526 4.09262C12.4772 3.91063 12.3668 3.74527 12.2275 3.60599C12.0882 3.4667 11.9228 3.35621 11.7408 3.28083C11.5588 3.20544 11.3638 3.16665 11.1668 3.16665L4.52681 3.19331Z' fill='#8B5CE4' />
          </svg>
          <span>Add account</span>
        </div>
        <div className='games-list'>
          <div className='connect-games'>
            <div className='row justify-content-center'>
              {
                gameList.map((game, idx) => (
                  <div className='col-md-4 col-6' key={idx}>
                    <button onClick={() => selectGame(game._id)} type='button' className={`connect-game-button ${chosenGameId === game._id ? 'active' : ''}`}>
                      <div className='logo'>
                        <img src='/assets/images/lol-icon.png' alt='lol' />
                      </div>
                      <div className='name'>{game.display_name}</div>
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={props.onDismiss}>CANCEL</button>
        <button type='button' className='de-btn de-btn-primary' disabled={!chosenGameId} onClick={handleContinue}>Continue</button>
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
    openModal(ConnectedModal, { data: { showStep: true } });
    // window.alert('Adding success');
  }, []);

  return (
    <>
      <div className='modal-body'>
        <div className='modal-title'>Connect Account</div>
        {step === 'pickGame' && <PickGame nextStep={nextStep} onDismiss={() => modalRef.close()} />}
        {step === 'addAccount' && <AddAccount showStep={true} gameName='LoL' gameIcon='/assets/images/lol-icon.png' gameId={chosenGameId} onSuccess={onAddingSuccess} onReturn={() => setStep('pickGame')} />}
      </div>
    </>
  )
}

export function ConfigGame() {
  const configGame = useCallback(() => {
    openModal(ConfigGameModal);
  }, []);

  return (
    <button className='de-btn de-btn-sm de-btn-outline-secondary' onClick={configGame}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12 16.49C11.8011 16.49 11.6103 16.411 11.4697 16.2703C11.329 16.1297 11.25 15.9389 11.25 15.74V7.73999C11.25 7.54108 11.329 7.35031 11.4697 7.20966C11.6103 7.06901 11.8011 6.98999 12 6.98999C12.1989 6.98999 12.3897 7.06901 12.5303 7.20966C12.671 7.35031 12.75 7.54108 12.75 7.73999V15.74C12.75 15.9389 12.671 16.1297 12.5303 16.2703C12.3897 16.411 12.1989 16.49 12 16.49Z' fill='currentColor' />
        <path d='M16 12.49H7.99997C7.81725 12.4688 7.6487 12.3812 7.52636 12.2438C7.40402 12.1065 7.33643 11.9289 7.33643 11.745C7.33643 11.5611 7.40402 11.3835 7.52636 11.2462C7.6487 11.1088 7.81725 11.0212 7.99997 11H16C16.1989 11 16.3896 11.079 16.5303 11.2197C16.671 11.3603 16.75 11.5511 16.75 11.75C16.75 11.9489 16.671 12.1397 16.5303 12.2803C16.3896 12.421 16.1989 12.5 16 12.5V12.49Z' fill='currentColor' />
        <path d='M12.0001 21.44C11.8668 21.441 11.7356 21.4065 11.6201 21.34L3.87006 16.87C3.75823 16.802 3.66557 16.7066 3.60083 16.5929C3.5361 16.4792 3.50141 16.3508 3.50006 16.22V7.26997C3.49844 7.13852 3.53186 7.00902 3.59689 6.89478C3.66192 6.78054 3.75621 6.68568 3.87006 6.61997L11.6201 2.13997C11.7347 2.07604 11.8638 2.04248 11.9951 2.04248C12.1263 2.04248 12.2554 2.07604 12.3701 2.13997L20.1201 6.61997C20.2365 6.68356 20.3334 6.77767 20.4003 6.8922C20.4673 7.00672 20.5018 7.13732 20.5001 7.26997V16.27C20.4986 16.402 20.4628 16.5314 20.3962 16.6453C20.3296 16.7593 20.2344 16.854 20.1201 16.92L12.3701 21.39C12.2537 21.4403 12.1256 21.4576 12.0001 21.44ZM5.00006 15.78L12.0001 19.78L19.0001 15.78V7.69997L12.0001 3.69997L5.00006 7.69997V15.78Z' fill='currentColor' />
      </svg>
      <span>Configure games</span>
    </button>
  )
}
