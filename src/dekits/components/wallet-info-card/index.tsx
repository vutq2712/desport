import { WalletAvatar } from "./avatar";
import { WalletBalance } from "./balance";
import { ConnectedNetwork } from "./network";
import { ConnectedWallet } from "./wallet";

export function AccountWalletCard() {
  return (
    <div className='de-account-wallet-card'>
      <div className='row'>
        <div className='col-xl-2 col-lg-3'>
          <WalletAvatar />
        </div>
        <div className='col-xl-10 col-lg-9'>
          <div className='row'>
            <div className='col-lg-4 col-4'>
              <WalletBalance />
            </div>
            <div className='col-lg-4 col-4'>
              <ConnectedNetwork />
            </div>
            <div className='col-lg-4 col-4'>
              <ConnectedWallet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
