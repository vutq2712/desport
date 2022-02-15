import { useRouter } from 'next/router';
import { createTournament } from '@app/api/tournament/create-tournament';
import { ErrorMessage, FormikProps, FormWrapper, Input, Radio, Yup } from '@app/dekits/form';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getGameModes, GameModesData } from '@app/api/game-mode/get-game-modes';
import { useSubscription } from '@app/hooks/subscription';
import { openModal } from '@app/dekits/modal';
import { ChampionIcon } from '@app/dekits/icons/champion-icon';
import { Col, Row } from 'react-bootstrap';
import { Icon } from '@app/dekits/icon';

enum Step {
  CHOOSE_NAME,
  CHOOSE_GAME,
  PRIZE_POOL,
}

interface FormValues {
  step: number,
  name: string,
  game_mode: string,
}

function CurrentLineIcon() {
  return <svg className='line' width='75' height='1' viewBox='0 0 75 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <line y1='0.5' x2='74.5' y2='0.5' stroke='#5062E5' />
  </svg>
}
function NextLineIcon() {
  return <svg className='line' width='75' height='1' viewBox='0 0 75 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <line x1='0.5' y1='0.5' x2='75' y2='0.5' stroke='#5062E5' strokeDasharray='4 4' />
  </svg>
}

function SuccessLineIcon() {
  return <svg className='line' width='132' height='1' viewBox='0 0 132 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <line y1='0.5' x2='132' y2='0.5' stroke='#609A5B' />
  </svg>
}

function Step1CheckIcon() {
  return <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.00005 8.51336C7.93359 8.513 7.86786 8.49941 7.80671 8.47336C7.74585 8.45065 7.69108 8.41414 7.64672 8.36669C7.55308 8.27294 7.50049 8.14586 7.50049 8.01336C7.50049 7.88086 7.55308 7.75377 7.64672 7.66002C7.69295 7.61483 7.74721 7.57865 7.80671 7.55336C7.86775 7.52694 7.93354 7.51331 8.00005 7.51331C8.06655 7.51331 8.13235 7.52694 8.19338 7.55336C8.25288 7.57865 8.30714 7.61483 8.35338 7.66002C8.44701 7.75377 8.49961 7.88086 8.49961 8.01336C8.49961 8.14586 8.44701 8.27294 8.35338 8.36669C8.30901 8.41414 8.25425 8.45065 8.19338 8.47336C8.13224 8.49941 8.06651 8.513 8.00005 8.51336V8.51336Z' fill='white' />
    <path d='M11.3333 13.86H4.66667C4.33499 13.8618 4.00627 13.7976 3.69966 13.671C3.39305 13.5445 3.11468 13.3583 2.88076 13.1231C2.64684 12.888 2.46206 12.6086 2.33718 12.3013C2.21229 11.9941 2.1498 11.665 2.15334 11.3333V4.66666C2.15334 4.33723 2.21844 4.01105 2.34491 3.70686C2.47138 3.40268 2.65672 3.12649 2.89028 2.89416C3.12384 2.66184 3.40102 2.47797 3.70587 2.35312C4.01073 2.22827 4.33725 2.1649 4.66667 2.16666H11.3333C11.6628 2.1649 11.9893 2.22827 12.2941 2.35312C12.599 2.47797 12.8762 2.66184 13.1097 2.89416C13.3433 3.12649 13.5286 3.40268 13.6551 3.70686C13.7816 4.01105 13.8467 4.33723 13.8467 4.66666V11.3333C13.8502 11.665 13.7877 11.9941 13.6628 12.3013C13.538 12.6086 13.3532 12.888 13.1193 13.1231C12.8853 13.3583 12.607 13.5445 12.3004 13.671C11.9937 13.7976 11.665 13.8618 11.3333 13.86V13.86ZM4.66667 3.16666C4.46857 3.1649 4.27208 3.2024 4.08855 3.27699C3.90502 3.35159 3.73809 3.4618 3.59738 3.60126C3.45668 3.74072 3.345 3.90668 3.26878 4.08954C3.19257 4.2724 3.15333 4.46855 3.15334 4.66666V11.3333C3.14977 11.5337 3.18638 11.7327 3.261 11.9187C3.33562 12.1046 3.44674 12.2737 3.5878 12.4161C3.72886 12.5584 3.89701 12.671 4.08231 12.7472C4.26761 12.8235 4.46631 12.8618 4.66667 12.86H11.3333C11.5337 12.8618 11.7324 12.8235 11.9177 12.7472C12.103 12.671 12.2712 12.5584 12.4122 12.4161C12.5533 12.2737 12.6644 12.1046 12.739 11.9187C12.8136 11.7327 12.8502 11.5337 12.8467 11.3333V4.66666C12.8467 4.46855 12.8074 4.2724 12.7312 4.08954C12.655 3.90668 12.5433 3.74072 12.4026 3.60126C12.2619 3.4618 12.095 3.35159 11.9115 3.27699C11.7279 3.2024 11.5314 3.1649 11.3333 3.16666H4.66667Z' fill='#8B5CE4' />
  </svg>
}

function Step2CheckIcon() {
  return <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M6.86006 7.33337C6.7933 7.33419 6.72706 7.32164 6.66523 7.29645C6.6034 7.27126 6.54724 7.23395 6.50006 7.1867C6.45487 7.14046 6.4187 7.0862 6.3934 7.0267C6.36681 6.96572 6.35319 6.89989 6.3534 6.83337C6.35519 6.75435 6.3757 6.67688 6.41323 6.60731C6.45076 6.53775 6.50425 6.47808 6.5693 6.43319C6.63436 6.3883 6.70913 6.35947 6.78749 6.34907C6.86584 6.33867 6.94555 6.347 7.02006 6.37337C7.07956 6.39867 7.13382 6.43484 7.18006 6.48003C7.27386 6.57371 7.32661 6.7008 7.32673 6.83337C7.32694 6.89989 7.31331 6.96572 7.28673 7.0267C7.23666 7.1474 7.14076 7.2433 7.02006 7.29337C6.96944 7.31583 6.9153 7.32937 6.86006 7.33337Z' fill='white' />
    <path d='M9.4734 9.99993C9.34079 9.99993 9.21362 9.94725 9.11985 9.85348C9.02608 9.75972 8.9734 9.63254 8.9734 9.49993C8.96329 9.43588 8.96329 9.37064 8.9734 9.3066C9.0011 9.24679 9.03951 9.19257 9.08674 9.1466C9.1311 9.09915 9.18587 9.06263 9.24674 9.03993C9.30664 9.01368 9.37133 9.00012 9.43674 9.00012C9.50214 9.00012 9.56683 9.01368 9.62673 9.03993C9.69035 9.06097 9.74766 9.09764 9.7934 9.1466C9.83859 9.19284 9.87477 9.2471 9.90007 9.3066C9.92665 9.36757 9.94027 9.43341 9.94007 9.49993C9.93995 9.63249 9.8872 9.75959 9.7934 9.85326C9.74586 9.90001 9.6891 9.93634 9.62673 9.95993C9.57842 9.9823 9.52649 9.99584 9.4734 9.99993Z' fill='white' />
    <path d='M11.6934 13.86H5.02669C4.69389 13.8636 4.36373 13.8006 4.05557 13.6749C3.74741 13.5492 3.46745 13.3632 3.23211 13.1279C2.99677 12.8926 2.8108 12.6126 2.68508 12.3044C2.55937 11.9963 2.49645 11.6661 2.50002 11.3333V4.66665C2.50002 4.00361 2.76341 3.36772 3.23225 2.89888C3.7011 2.43004 4.33698 2.16665 5.00002 2.16665H11.6667C11.9972 2.16312 12.3252 2.22518 12.6316 2.34924C12.938 2.4733 13.2167 2.65689 13.4517 2.88938C13.6867 3.12188 13.8732 3.39867 14.0005 3.70374C14.1278 4.0088 14.1934 4.33609 14.1934 4.66665V11.3333C14.1969 11.6639 14.1348 11.9918 14.0108 12.2982C13.8867 12.6046 13.7031 12.8834 13.4706 13.1183C13.2381 13.3533 12.9613 13.5399 12.6563 13.6672C12.3512 13.7945 12.0239 13.86 11.6934 13.86ZM5.02669 3.19331C4.8297 3.18978 4.63394 3.22509 4.4506 3.29722C4.26726 3.36936 4.09992 3.47691 3.95815 3.61373C3.81638 3.75054 3.70295 3.91395 3.62434 4.09461C3.54574 4.27528 3.50349 4.46965 3.50002 4.66665V11.3333C3.50002 11.7311 3.65806 12.1127 3.93936 12.394C4.22067 12.6753 4.6022 12.8333 5.00002 12.8333H11.6667C11.8637 12.8333 12.0587 12.7945 12.2407 12.7191C12.4227 12.6438 12.5881 12.5333 12.7273 12.394C12.8666 12.2547 12.9771 12.0893 13.0525 11.9073C13.1279 11.7254 13.1667 11.5303 13.1667 11.3333V4.66665C13.1667 4.46966 13.1279 4.27461 13.0525 4.09262C12.9771 3.91063 12.8666 3.74527 12.7273 3.60599C12.5881 3.4667 12.4227 3.35621 12.2407 3.28083C12.0587 3.20544 11.8637 3.16665 11.6667 3.16665L5.02669 3.19331Z' fill='#8B5CE4' />
  </svg>
}

function Step3CheckIcon() {
  return <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M5.70678 6.49998C5.62776 6.49819 5.55029 6.47768 5.48073 6.44015C5.41116 6.40262 5.35149 6.34913 5.3066 6.28408C5.26171 6.21902 5.23288 6.14425 5.22249 6.06589C5.21209 5.98754 5.22041 5.90783 5.24678 5.83332C5.26948 5.77245 5.306 5.71768 5.35345 5.67332C5.42267 5.60389 5.51101 5.55667 5.60719 5.53767C5.70337 5.51867 5.80303 5.52876 5.89345 5.56665C5.95581 5.59025 6.01257 5.62657 6.06011 5.67332C6.10531 5.71956 6.14148 5.77382 6.16678 5.83332C6.20613 5.92458 6.21701 6.0256 6.19797 6.12314C6.17894 6.22069 6.13089 6.31021 6.06011 6.37998C6.01257 6.42673 5.95581 6.46306 5.89345 6.48665C5.83286 6.50423 5.76925 6.50877 5.70678 6.49998Z' fill='white' />
    <path d='M7.8468 8.51336C7.71419 8.51336 7.58702 8.46068 7.49325 8.36691C7.39948 8.27314 7.3468 8.14597 7.3468 8.01336C7.34832 7.94762 7.35955 7.88247 7.38014 7.82002C7.40783 7.76022 7.44624 7.70599 7.49347 7.66002C7.53971 7.61483 7.59397 7.57866 7.65347 7.55336C7.71337 7.5271 7.77806 7.51355 7.84347 7.51355C7.90887 7.51355 7.97357 7.5271 8.03347 7.55336C8.09583 7.57695 8.15259 7.61328 8.20013 7.66002C8.24533 7.70626 8.2815 7.76052 8.3068 7.82002C8.34616 7.91129 8.35703 8.01231 8.33799 8.10985C8.31896 8.2074 8.27091 8.29692 8.20013 8.36669C8.10565 8.45928 7.97908 8.51182 7.8468 8.51336Z' fill='white' />
    <path d='M9.96013 10.5C9.89584 10.4995 9.83232 10.4859 9.77346 10.46C9.7111 10.4364 9.65434 10.4001 9.6068 10.3534C9.51316 10.2596 9.46057 10.1325 9.46057 10C9.46057 9.86754 9.51316 9.74046 9.6068 9.64671C9.65434 9.59996 9.7111 9.56363 9.77346 9.54004C9.86389 9.50215 9.96354 9.49206 10.0597 9.51106C10.1559 9.53006 10.2442 9.57728 10.3135 9.64671C10.3833 9.71663 10.4309 9.80568 10.4501 9.90262C10.4694 9.99955 10.4595 10.1 10.4217 10.1913C10.3838 10.2826 10.3198 10.3607 10.2377 10.4156C10.1555 10.4706 10.059 10.5 9.96013 10.5Z' fill='white' />
    <path d='M11.1801 13.86H4.51348C4.18179 13.8618 3.85307 13.7976 3.54646 13.671C3.23985 13.5445 2.96148 13.3583 2.72756 13.1231C2.49365 12.888 2.30886 12.6086 2.18398 12.3013C2.05909 11.9941 1.9966 11.665 2.00014 11.3333V4.66666C2.00014 4.33723 2.06524 4.01105 2.19171 3.70686C2.31818 3.40268 2.50352 3.12649 2.73708 2.89416C2.97064 2.66184 3.24782 2.47797 3.55267 2.35312C3.85753 2.22827 4.18405 2.1649 4.51348 2.16666H11.1801C11.5096 2.1649 11.8361 2.22827 12.1409 2.35312C12.4458 2.47797 12.723 2.66184 12.9565 2.89416C13.1901 3.12649 13.3754 3.40268 13.5019 3.70686C13.6284 4.01105 13.6935 4.33723 13.6935 4.66666V11.3333C13.697 11.665 13.6345 11.9941 13.5096 12.3013C13.3848 12.6086 13.2 12.888 12.9661 13.1231C12.7321 13.3583 12.4538 13.5445 12.1472 13.671C11.8405 13.7976 11.5118 13.8618 11.1801 13.86ZM4.51348 3.16666C4.31537 3.1649 4.11889 3.2024 3.93536 3.27699C3.75183 3.35159 3.58489 3.4618 3.44419 3.60126C3.30348 3.74072 3.1918 3.90668 3.11559 4.08954C3.03937 4.2724 3.00013 4.46855 3.00014 4.66666V11.3333C2.99657 11.5337 3.03318 11.7327 3.1078 11.9187C3.18242 12.1046 3.29354 12.2737 3.4346 12.4161C3.57567 12.5584 3.74381 12.671 3.92911 12.7472C4.11441 12.8235 4.31311 12.8618 4.51348 12.86H11.1801C11.3805 12.8618 11.5792 12.8235 11.7645 12.7472C11.9498 12.671 12.118 12.5584 12.259 12.4161C12.4001 12.2737 12.5112 12.1046 12.5858 11.9187C12.6604 11.7327 12.697 11.5337 12.6935 11.3333V4.66666C12.6935 4.46855 12.6542 4.2724 12.578 4.08954C12.5018 3.90668 12.3901 3.74072 12.2494 3.60126C12.1087 3.4618 11.9418 3.35159 11.7583 3.27699C11.5747 3.2024 11.3782 3.1649 11.1801 3.16666H4.51348Z' fill='#8B5CE4' />
  </svg>
}

function SuccessIcon() {
  return <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M6.36673 13.2733C6.06998 13.2712 5.78561 13.1541 5.5734 12.9467L1.44006 8.80667C1.39289 8.7607 1.3554 8.70576 1.3298 8.64508C1.3042 8.58439 1.29102 8.5192 1.29102 8.45333C1.29102 8.38747 1.3042 8.32228 1.3298 8.26159C1.3554 8.20091 1.39289 8.14596 1.44006 8.1L3.04673 6.48667C3.26256 6.27374 3.55355 6.15436 3.85673 6.15436C4.15991 6.15436 4.4509 6.27374 4.66673 6.48667L6.52006 8.34667C6.54243 8.36826 6.57231 8.38032 6.6034 8.38032C6.63448 8.38032 6.66436 8.36826 6.68673 8.34667L11.5867 3.44667C11.8002 3.24212 12.0844 3.12793 12.3801 3.12793C12.6757 3.12793 12.9599 3.24212 13.1734 3.44667L14.1401 4.41333C14.3489 4.62321 14.4661 4.90725 14.4661 5.20333C14.4661 5.49942 14.3489 5.78345 14.1401 5.99333L7.16006 12.9467C6.94785 13.1541 6.66348 13.2712 6.36673 13.2733ZM2.50006 8.45333L6.28006 12.2333C6.30243 12.2549 6.33231 12.267 6.3634 12.267C6.39448 12.267 6.42436 12.2549 6.44673 12.2333L13.4001 5.28667C13.4217 5.2643 13.4337 5.23442 13.4337 5.20333C13.4337 5.17225 13.4217 5.14237 13.4001 5.12L12.4334 4.15333C12.4099 4.1313 12.3789 4.11904 12.3467 4.11904C12.3145 4.11904 12.2835 4.1313 12.2601 4.15333L7.3334 9.05333C7.12026 9.25592 6.83745 9.36889 6.5434 9.36889C6.24934 9.36889 5.96653 9.25592 5.7534 9.05333L3.92673 7.19333C3.91685 7.17957 3.90384 7.16836 3.88877 7.16062C3.8737 7.15288 3.857 7.14885 3.84006 7.14885C3.82312 7.14885 3.80643 7.15288 3.79135 7.16062C3.77628 7.16836 3.76327 7.17957 3.7534 7.19333L2.50006 8.45333Z' fill='#609A5B' />
  </svg>
}


function ChooseName({ onDismiss }: { onDismiss: () => void }) {
  return (
    <>
      <div className='modal-inner'>
        <div className='de-create-tournament-step'>
          <Step1CheckIcon />
          <span>{t('tournament.create.step_1_choose_name')}</span>
          <NextLineIcon />
          <Step2CheckIcon />
          <NextLineIcon />
          <Step3CheckIcon />
        </div>
        <div className='de-form-group form-group'>
          <Input name='name' placeholder='Tournament name' icon={ChampionIcon} />
          <div className='de-form-error'>
            <ErrorMessage name='name' />
          </div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={onDismiss}>CANCEL</button>
        <button type='submit' className='de-btn de-btn-outline-primary w-100'>{t('tournament.create.button_continue')}</button>
      </div>
    </>
  )
}

function ChooseGame({ onBack }: { onBack: () => void }) {
  const [gameModes, changeGameModes] = useState<GameModesData[]>([]);
  const [textSearch, changeTextSearch] = useState<string>('');
  const listGame = useRef<GameModesData[]>([]);
  const [chosenGameId, setChosenGameId] = useState<string>();

  useEffect(() => {
    getGameModes().subscribe(res => {
      listGame.current = res.data;
      changeGameModes(res.data);
    })
  }, [])

  const selectGame = useCallback(gameId => {
    setChosenGameId(gameId);
  }, []);

  const searchGame = (e) => {
    if (!e?.target) return;

    changeTextSearch(e.target.value)
    const games = listGame.current.filter(item => item.display_name.toLowerCase().includes(e.target.value.toLowerCase()));
    changeGameModes(games);
  }

  return (
    <>
      <div className='modal-inner'>
        <div className='de-create-tournament-step'>
          <SuccessIcon />
          <CurrentLineIcon />
          <Step2CheckIcon />
          <span>{t('tournament.create.step_2_choose_game')}</span>
          <NextLineIcon />
          <Step3CheckIcon />
        </div>
        <div className='de-form-group form-group'>
          <div className='de-form-control-with-icon de-mb-2'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M9.75 17.27C8.26664 17.27 6.8166 16.8302 5.58323 16.006C4.34986 15.1819 3.38856 14.0106 2.82091 12.6401C2.25325 11.2697 2.10472 9.7617 2.39411 8.30685C2.6835 6.85199 3.39781 5.51562 4.4467 4.46672C5.4956 3.41783 6.83197 2.70352 8.28683 2.41413C9.74168 2.12474 11.2497 2.27327 12.6201 2.84093C13.9906 3.40858 15.1619 4.36988 15.986 5.60325C16.8101 6.83661 17.25 8.28666 17.25 9.77002C17.25 11.7591 16.4598 13.6668 15.0533 15.0733C13.6468 16.4798 11.7391 17.27 9.75 17.27ZM9.75 3.77002C8.56332 3.77002 7.40328 4.12192 6.41658 4.78121C5.42989 5.44049 4.66085 6.37757 4.20673 7.47392C3.7526 8.57028 3.63378 9.77668 3.86529 10.9406C4.0968 12.1045 4.66825 13.1735 5.50736 14.0127C6.34648 14.8518 7.41558 15.4232 8.57946 15.6547C9.74335 15.8862 10.9497 15.7674 12.0461 15.3133C13.1425 14.8592 14.0795 14.0901 14.7388 13.1034C15.3981 12.1167 15.75 10.9567 15.75 9.77002C15.75 8.17872 15.1179 6.6526 13.9926 5.52738C12.8674 4.40216 11.3413 3.77002 9.75 3.77002Z' fill='currentColor' />
              <path d='M21 21.7701C20.9015 21.7705 20.8039 21.7513 20.7128 21.7135C20.6218 21.6758 20.5393 21.6202 20.47 21.5501L14 15.0701C13.9258 15.0021 13.8661 14.9198 13.8244 14.8283C13.7826 14.7367 13.7598 14.6376 13.7571 14.537C13.7544 14.4364 13.7721 14.3363 13.8089 14.2427C13.8457 14.149 13.901 14.0637 13.9715 13.9919C14.042 13.9201 14.1262 13.8632 14.2192 13.8246C14.3121 13.786 14.4119 13.7665 14.5125 13.7672C14.6131 13.768 14.7126 13.789 14.8049 13.829C14.8973 13.869 14.9806 13.9272 15.05 14.0001L21.53 20.4801C21.6705 20.6207 21.7494 20.8113 21.7494 21.0101C21.7494 21.2088 21.6705 21.3994 21.53 21.5401C21.4616 21.612 21.3795 21.6694 21.2884 21.7089C21.1974 21.7484 21.0993 21.7692 21 21.7701Z' fill='currentColor' />
            </svg>
            <input
              className='de-form-control form-control'
              placeholder='Search game'
              type='text'
              onChange={searchGame}
              value={textSearch}
            />
          </div>

          {/* <div className='list-game'>
            {gameModes.map(game => (
              <label key={game._id}>
                <Radio name='game_mode' value={game._id} /> {game.display_name}
                <br />
              </label>
            ))}
          </div>

          <div className='de-form-error'>
            <ErrorMessage name='game_mode' />
          </div> */}
          <div className='choose-games-list'>
            <div className='all-games-list'>
              <Row>
                {
                  gameModes.map((game) => (
                    <Col md='4' xs='6' key={game._id}>
                      <div className='choose-game-button-wrap' onClick={() => selectGame(game._id)}>
                        <button type='button' className={`choose-game-button ${chosenGameId === game._id ? 'active' : ''}`}>
                          <div className='logo'>
                            <img src='/assets/images/lol-icon.png' alt='lol' />
                          </div>
                          <div className='name'>{game.display_name}</div>
                        </button>
                        <Radio name='game_mode' value={game._id} />
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
          <div className='de-form-error'>
            <ErrorMessage name='game_mode' />
          </div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={onBack}>{t('tournament.create.button_back')}</button>
        <button type='submit' className='de-btn de-btn-outline-primary w-100'>{t('tournament.create.button_continue')}</button>
      </div>
    </>
  )
}

function PrizePool({ onLater }: { onLater: () => void }) {
  return (
    <>
      <div className='modal-inner'>
        <div className='de-create-tournament-step'>
          <SuccessIcon />
          <SuccessLineIcon />
          <SuccessIcon />
          <SuccessLineIcon />
          <SuccessIcon />
        </div>
        <div className='de-tournament-created text-center de-mb-7'>
          <div className='de-mb-2'>
            <img src='/assets/images/tournament-created.svg' alt='' />
          </div>
          <h2>{t('tournament.create.created')}</h2>
          <div className='text-uppercase'>ESL PRO TOURNAMENT</div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={onLater}>{t('tournament.create.button_later')}</button>
        <button type='submit' className='de-btn de-btn-primary w-100'>{t('tournament.create.button_setup')}</button>
      </div>
    </>
  )
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  game_mode: Yup.string().test({
    name: 'validate',
    test(value) {
      const { step } = this.parent;
      if (step === Step.CHOOSE_GAME && !value) {
        return false;
      }

      return true;
    },
    message: 'Please select game',
  }),
});


function CreateTournamentModal(props: any) {
  const { modalRef } = props;
  const [step, changeStep] = useState(Step.CHOOSE_NAME);
  const initialValues = useMemo<FormValues>(() => ({
    step: Step.CHOOSE_NAME,
    name: '',
    game_mode: '',
  }), []);
  const formRef = useRef<FormikProps<FormValues>>(null);
  const subscription = useSubscription();
  const router = useRouter();

  const handleSubmit = useCallback(values => {
    if (step === 2) {
      const createTournamentSub = createTournament({
        name: values.name,
        game_mode: values.game_mode,
      }).subscribe((res: any) => {
        modalRef.close();
        router.push(`/tournament-setting/${res.data._id}`);
      }, (error) => {
        alert(error?.response?.msg || 'Error');
      })

      subscription.add(createTournamentSub)
      return;
    }

    if (step < 2) {
      formRef.current?.setFieldValue('step', step + 1);
      changeStep(step + 1);
    } else {
      formRef.current?.setFieldValue('step', step - 1);
      changeStep(step - 1);
    }
  }, [step, router, modalRef, subscription]);

  const onBack = useCallback(() => {
    formRef.current?.setFieldValue('step', step - 1);
    changeStep(step - 1);
  }, [step])

  const onLater = useCallback(() => {
    createTournament({
      name: formRef.current?.values.name as string,
      game_mode: formRef.current?.values.game_mode as string,
    }).subscribe(() => {
      alert('Create success');
      changeStep(Step.CHOOSE_NAME);
    }, (error) => {
      alert(error?.response?.msg || 'Error');
    })
  }, [])

  return (
    <div className='modal-body'>
      <div className='modal-title de-create-tournament-title'>{t('tournament.create.create_new_tournament')}</div>
      <FormWrapper<FormValues>
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {step === Step.CHOOSE_NAME && <ChooseName onDismiss={() => modalRef.close()} />}
        {step === Step.CHOOSE_GAME && <ChooseGame onBack={onBack} />}
        {step === Step.PRIZE_POOL && <PrizePool onLater={onLater} />}
      </FormWrapper>
    </div>
  )
}

export function CreateTournament() {
  const onCreateTournament = useCallback(() => {
    openModal(CreateTournamentModal, { dialogClassName: 'de-modal-md de-modal-create-tournament' });
  }, []);

  return (
    <button className='de-btn de-btn-secondary' onClick={() => onCreateTournament()} type='button'>
      <span>{t('tournament.create.new_tournament')}</span>
      <Icon name='add-new' width={18} height={18}/>
    </button>
  )
}
