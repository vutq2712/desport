import { BSCNetworkIcon } from "@app/dekits/icons/bsc-network-icon";
import { CoinbaseWalletIcon } from "@app/dekits/icons/coinbase-wallet-icon";
import { EthereumNetworkIcon } from "@app/dekits/icons/ethereum-network-icon";
import { MetamaskIcon } from "@app/dekits/icons/metamask-icon";
import { PolygonNetworkIcon } from "@app/dekits/icons/polygon-network-icon";
import { WalletConnectIcon } from "@app/dekits/icons/wallet-connect-icon";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { NetworkItem } from "../network-item";
import { CHAIN_IDS, injected } from "./connectors";


export function ConnectWalletModal(props: any) {
  const { modalRef } = props;
  const [agree, setAgree] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(-1);
  const [selectedWallet, setSelectedWallet] = useState(-1);

  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const connect = async () => {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', 'true');
      
      await modalRef.close({active,account})
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => { 
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', 'true')
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
    <div className='modal-body'>
      <div className='modal-title de-mb-4 text-uppercase'>Connect Wallet</div>
      <div className='modal-inner'>
        <div className='text-white-50 de-mb-1'>I .Accept</div>
        <div className='de-auth-form-confirm de-mb-2'>
          <div className='de-form-check form-check mb-0'>
            <input className='de-form-check-input form-check-input' type='checkbox' id='chk1' checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label className='de-form-check-label form-check-label' htmlFor='chk1'>
              I read and accept the <a href='#'>Terms of Service</a>&nbsp;and&nbsp;<a href='#'>Privacy Policy.</a>
            </label>
          </div>
        </div>
        <div className='text-white-50 de-mb-2'>II. Choose network</div>
        <div className='row de-gx-3'>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedNetwork === +CHAIN_IDS.REACT_APP_ETH_CHAIN_ID} onSelect={() => setSelectedNetwork(+CHAIN_IDS.REACT_APP_ETH_CHAIN_ID)} icon={EthereumNetworkIcon} name='Ethereum' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedNetwork === CHAIN_IDS.REACT_APP_BSC_CHAIN_ID} onSelect={() => setSelectedNetwork(CHAIN_IDS.REACT_APP_BSC_CHAIN_ID)} icon={BSCNetworkIcon} name='BSC' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedNetwork === CHAIN_IDS.REACT_APP_POLYGON_CHAIN_ID} onSelect={() => setSelectedNetwork(CHAIN_IDS.REACT_APP_POLYGON_CHAIN_ID)} icon={PolygonNetworkIcon} name='Polygon' />
          </div>
        </div>
        <div className='text-white-50 de-mb-2'>III. Choose wallet</div>
        <div className='row de-gx-3'>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === 1} onSelect={() => setSelectedWallet(1)} icon={MetamaskIcon} name='MetaMask' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === 2} onSelect={() => setSelectedWallet(2)} icon={WalletConnectIcon} name='WalletConnect' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === 3} onSelect={() => setSelectedWallet(3)} icon={BSCNetworkIcon} name='BSC Wallet' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === 4} onSelect={() => setSelectedWallet(4)} icon={CoinbaseWalletIcon} name='Coinbase Wallet' />
          </div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
        <button type='submit' disabled={!agree || selectedNetwork === -1 || selectedWallet === -1} className='de-btn de-btn-primary w-100' onClick={connect}>CONNECT</button>
      </div>
    </div>
  )
}
