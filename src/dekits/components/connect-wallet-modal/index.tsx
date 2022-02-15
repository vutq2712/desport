import { BSCNetworkIcon } from "@app/dekits/icons/bsc-network-icon";
import { CoinbaseWalletIcon } from "@app/dekits/icons/coinbase-wallet-icon";
import { EthereumNetworkIcon } from "@app/dekits/icons/ethereum-network-icon";
import { MetamaskIcon } from "@app/dekits/icons/metamask-icon";
import { PolygonNetworkIcon } from "@app/dekits/icons/polygon-network-icon";
import { WalletConnectIcon } from "@app/dekits/icons/wallet-connect-icon";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { NetworkItem } from "../network-item";
import { CHAIN_IDS, injected, RPC_URL, walletConnect, WalletNames } from "./connectors";


export function ConnectWalletModal(props: any) {
  const { modalRef } = props;
  const [agree, setAgree] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(-1);
  const [selectedWallet, setSelectedWallet] = useState('');

  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const handleConnectNetwork = (networkSelected:number) => {
    switch (networkSelected) {
    case CHAIN_IDS.REACT_APP_ETH_CHAIN_ID:
      return `${RPC_URL.ETH_RPC_URL}`;
    case CHAIN_IDS.REACT_APP_BSC_CHAIN_ID:
      return `${RPC_URL.BSC_RPC_URL}`;
    case CHAIN_IDS.REACT_APP_POLYGON_CHAIN_ID:
    default:
      return `${RPC_URL.POLYGON_RPC_URL}`;
    }
  }

  const handleConnectWallet = (walletName: string) => {
    switch (walletName) {
    case WalletNames.MetaMask:
      return injected;
    case WalletNames.WalletConnect:
      return walletConnect;
    default:
      break;
    }
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(handleConnectNetwork(selectedNetwork)));
  const connect = async () => {
    try {
      await activate(handleConnectWallet(selectedWallet) as AbstractConnector)
      localStorage.setItem('isWalletConnected', 'true');
      var balance = await web3.eth.getBalance(`${account}`); //Will give value in.
      await modalRef.close({active,account,balance})
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => { 
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(handleConnectWallet(selectedWallet) as AbstractConnector)
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
            <NetworkItem selected={selectedWallet === WalletNames.MetaMask} onSelect={() => setSelectedWallet(WalletNames.MetaMask)} icon={MetamaskIcon} name='MetaMask' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === WalletNames.WalletConnect} onSelect={() => setSelectedWallet(WalletNames.WalletConnect)} icon={WalletConnectIcon} name='WalletConnect' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === WalletNames.BSC} onSelect={() => setSelectedWallet(WalletNames.BSC)} icon={BSCNetworkIcon} name='BSC Wallet' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedWallet === WalletNames.WalletLinkConnect} onSelect={() => setSelectedWallet(WalletNames.WalletLinkConnect)} icon={CoinbaseWalletIcon} name='Coinbase Wallet' />
          </div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
        <button type='submit' disabled={!agree || selectedNetwork === -1 || selectedWallet === ''} className='de-btn de-btn-primary w-100' onClick={connect}>CONNECT</button>
      </div>
    </div>
  )
}
