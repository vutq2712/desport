import { useCallback } from 'react';
import { openModal } from '@app/dekits/modal';
import { useSession } from '@app/hooks/session';
import { MyAccountModal } from '../account-modal';
// import { SwitchNetworkModal } from '../switch-network-modal';

export function UserCardHeader() {
  const { userInfo } = useSession();
  const handleAccountClick = useCallback(() => {
    openModal(MyAccountModal, { dialogClassName: 'de-modal-md' });
  }, []);

  return (
    <button type='button' className='de-user-card-header' onClick={handleAccountClick}>
      <div className='de-user-card-header-title'>{userInfo?.name}</div>
      <div className='de-user-card-header-flag'>
        <img src='/assets/images/flags/Vietnam.png' alt='vi' />
      </div>
      <div className='de-user-card-header-status online'></div>
      <div className='de-user-card-header-avatar'>
        <img src='/assets/images/users/avatar.png' alt='Avatar' />
      </div>
    </button>
  )
}
