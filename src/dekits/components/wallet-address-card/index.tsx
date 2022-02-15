export function WalletAddressCard() {
  return (
    <div className='de-wallet-address-card'>
      <div className='de-wallet-connected'>
        <div className='de-network-logo'>
          <img src='/assets/icons/metamask.svg' alt='metamask' />
        </div>
        <div className='de-address'>0df89eyhve8723bg290df89eyhvee</div>
      </div>
      <button type='button' className='de-btn-copy-address'>
                Copy
      </button>
    </div>
  )
}
