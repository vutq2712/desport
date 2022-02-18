import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useCallback, useEffect, useState } from "react";
import { NetworkItem } from "../network-item";
import { ConnectorNames, connectorsSupportByNetwork, SUPPORTED_WALLETS } from "./connectors";
import { appNetworkType, APP_NETWORKS, APP_NETWORKS_NAME, APP_NETWORKS_SUPPORT, BSC_CHAIN_ID, ETH_CHAIN_ID, POLYGON_CHAIN_ID, requestSupportNetwork } from "./connectors/networks";


export function ConnectWalletModal(props: any) {
  const { modalRef } = props;
  const [agree, setAgree] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [walletName, setWalletName] = useState<(undefined | string)[]>([]);
  const [currentConnector, setCurrentConnector] = useState<undefined | AbstractConnector>(undefined);
  const [walletNameSuccess, setWalletNameSuccess] = useState<string | undefined>(undefined);


  const handleProviderChosen = (name: string, connector: AbstractConnector) => {
    setCurrentConnector(connector);
    walletName.indexOf(name) < 0 && setWalletName([...walletName, name]);
  }

  const handleNetworkChange = (
    appNetwork: boolean,
    updatedVal: string,
    connector?: AbstractConnector,
  ) => {
    if (appNetwork) {
      // settingAppNetwork(NetworkUpdateType.App, updatedVal);
      return;
    }
    connector &&
        handleProviderChosen &&
        handleProviderChosen(
          updatedVal,
          connector,
        );
  };


  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const connectorsByNetwork = (() => {
    switch (selectedNetwork) {
    case BSC_CHAIN_ID:
      return connectorsSupportByNetwork[APP_NETWORKS_NAME.BSC];

    case POLYGON_CHAIN_ID:
      return connectorsSupportByNetwork[APP_NETWORKS_NAME.POLYGON];

    case ETH_CHAIN_ID:
    default:
      return SUPPORTED_WALLETS;
    }
  })();

  const tryActivate = useCallback(async (connector: AbstractConnector, appChainID: string, wallet: string) => {
    try {
      if (wallet === ConnectorNames.MetaMask || wallet === ConnectorNames.BSC) {
        await requestSupportNetwork(appChainID, wallet);
      }

      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }
      
      if (connector && walletName) {        
        await activate(connector, undefined, true)
          .then(() => {
            setWalletNameSuccess(wallet);
            localStorage.setItem('walletNameSuccess',wallet);
          })
          .catch(async error => {
            console.log(connector);
            
            console.log(error,'error');
            
          });
      }
      
      modalRef.close({appChainID,wallet,connector})
    } catch (error) {
      
    }
  },[connector])

  useEffect(() => {
    const tryLoginAfterSwitch = async () => {
      if(currentConnector && APP_NETWORKS_SUPPORT[selectedNetwork]) {
        let ok = true;
        ok && await tryActivate(
          currentConnector,
          selectedNetwork,
          walletName[walletName.length - 1] as string
        )
      }
    };    

    currentConnector && selectedNetwork && walletName.length > 0 && tryLoginAfterSwitch();
  }, []);

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
          {Object.keys(APP_NETWORKS).map((key: string) => {
            const network = APP_NETWORKS[key as appNetworkType];
            return (
              <div className='col-md-4 col-6' key={key}>
                <NetworkItem selected={selectedNetwork === network.id} onSelect={() => {
                  setSelectedNetwork(network.id);
                  handleNetworkChange(true,network.id)
                }} icon={network.icon} name={network.name} />
              </div>
            );
          })}
        </div>
        <div className='text-white-50 de-mb-2'>III. Choose wallet</div>
        <div className='row de-gx-3'>
          {Object.keys(connectorsByNetwork).map((key: string) => {
            const network = connectorsByNetwork[key];
            return (
              <div className='col-md-4 col-6' key={key}>
                <NetworkItem selected={selectedWallet === network.name} onSelect={() => {
                  setSelectedWallet(network.name)
                  handleNetworkChange(false,network.name, network.connector  )
                }} icon={network.icon} name={network.name} />
              </div>
            );
          })}
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
        <button type='submit' disabled={!agree || selectedNetwork === '' || selectedWallet === ''} className='de-btn de-btn-primary w-100' 
          onClick={() => {
            tryActivate( 
            currentConnector as AbstractConnector,
            selectedNetwork,
            walletName[walletName.length - 1] as string)}}
        >
          CONNECT</button>
      </div>
    </div>
  )
}