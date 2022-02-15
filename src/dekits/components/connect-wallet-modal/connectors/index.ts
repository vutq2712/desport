import { InjectedConnector } from '@web3-react/injected-connector'
import {URI_AVAILABLE, WalletConnectConnector} from '@web3-react/walletconnect-connector'


export enum CHAIN_IDS{
  REACT_APP_ETH_CHAIN_ID=5,
  REACT_APP_BSC_CHAIN_ID=97,
  REACT_APP_POLYGON_CHAIN_ID=80001,
}

export enum RPC_URL{
  ETH_RPC_URL='https://goerli.infura.io/v3/e267dd5ef60949ba9bb3195ccacde657',
  BSC_RPC_URL='https://bsc-dataseed.binance.org/',
  POLYGON_RPC_URL='https://rpc-mumbai.maticvigil.com/',
}

export enum WalletNames {
  MetaMask = "MetaMask",
  BSC = "BSC Wallet",
  WalletConnect = "WalletConnect",
  // WalletConnectBsc = "WalletConnect",
  WalletLinkConnect = "Coinbase Wallet",
}


export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

export const walletConnect = new WalletConnectConnector({
  rpc: {
    [Number(CHAIN_IDS.REACT_APP_ETH_CHAIN_ID)]: process.env.REACT_APP_NETWORK_URL as string,
    [Number(CHAIN_IDS.REACT_APP_BSC_CHAIN_ID)]: 'https://bsc-dataseed.binance.org/',
    [Number(CHAIN_IDS.REACT_APP_POLYGON_CHAIN_ID)]: 'https://rpc-mainnet.maticvigil.com'
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  //@ts-ignore
  pollingInterval: 10000
});
