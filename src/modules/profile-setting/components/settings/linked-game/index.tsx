import { GameAccount } from "./game-account";

export function LinkedGameAccounts() {
  return (
    <div className='de-card full-h'>
      <div className='de-card-body'>
        <div className='de-profile-accounts'>
          <GameAccount logo='/assets/images/steam.png' game='Steam' username='tsunaminori' />
          <GameAccount logo='/assets/images/twitchTV.png' game='TwitchTV' username='tsunaminori' />
          <GameAccount logo='/assets/images/youtube.png' game='Youtube' username='tsunaminori' />
        </div>
        <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>Add account</button>
      </div>
    </div>
  )
}
