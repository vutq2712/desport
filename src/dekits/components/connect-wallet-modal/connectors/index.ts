import { BSCNetworkIcon } from '@app/dekits/icons/bsc-network-icon';
import { CoinbaseWalletIcon } from '@app/dekits/icons/coinbase-wallet-icon';
import { MetamaskIcon } from '@app/dekits/icons/metamask-icon';
import { WalletConnectIcon } from '@app/dekits/icons/wallet-connect-icon';
import { BscConnector } from '@binance-chain/bsc-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector'
import {URI_AVAILABLE, WalletConnectConnector} from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { APP_NETWORKS_NAME, BSC_CHAIN_ID, ETH_CHAIN_ID, POLYGON_CHAIN_ID } from './networks';

export enum RPC_URL{
  ETH_RPC_URL='https://goerli.infura.io/v3/e267dd5ef60949ba9bb3195ccacde657',
  BSC_RPC_URL='https://bsc-dataseed.binance.org/',
  POLYGON_RPC_URL='https://rpc-mumbai.maticvigil.com/',
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  // iconName: string
  description: string
  href: string | null
  // color: string
  primary?: true
  mobile?: true
  mobileOnly?: true,
  disableIcon?: string;
  icon: any ;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = "MetaMask",
  BSC = "BSC Wallet",
  WalletConnect = "WalletConnect",
  WalletConnectBsc = "WalletConnectBsc",
  WalletConnectPolygon = "WalletConnectPolygon",
  WalletLinkConnect = "Coinbase Wallet",
  // Fortmatic = 'Fortmatic'
}


export enum WalletNames {
  Injected = "Injected",
  BSC = "BSC Wallet",
  WalletConnect = "WalletConnect",
  // WalletConnectBsc = "WalletConnect",
  WalletLink = "WalletLink",
}


export const bscConnector = new BscConnector({}) as any;
export const injected = new InjectedConnector({});

const originalChainIdChangeHandler = bscConnector.handleChainChanged;

//@ts-ignore
bscConnector.handleChainChanged = (chainId: string) => {
  const chainIdNum = Number(chainId);
  console.debug("Handling 'chainChanged' event with payload", chainId, isNaN(chainIdNum));
  if (isNaN(chainIdNum)) {
    bscConnector.emitError('NaN ChainId');
    return;
  }
  //@ts-ignore
  originalChainIdChangeHandler(chainId)
};

// mainnet only
export const walletLinkConnect = new WalletLinkConnector({
  url: process.env.REACT_APP_NETWORK_URL || '',
  appName: 'DeSports',
  appLogoUrl: 'h/_next/static/media/Logo.6d0eafdc.svg',
  darkMode: true,
  // supportedChainIds: [1,4,5],
});

// mainnet only
export const walletConnect = new WalletConnectConnector({
  rpc: {
    [Number(ETH_CHAIN_ID)]: process.env.REACT_APP_NETWORK_URL as string,
    [Number(BSC_CHAIN_ID)]: 'https://bsc-dataseed.binance.org/',
    [Number(POLYGON_CHAIN_ID)]: 'https://rpc-mainnet.maticvigil.com'
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  //@ts-ignore
  pollingInterval: 12000
});

export const walletConnectBsc = new WalletConnectConnector({
  rpc: {
    [Number(ETH_CHAIN_ID)]: process.env.REACT_APP_NETWORK_URL as string,
    [Number(BSC_CHAIN_ID)]: 'https://bsc-dataseed.binance.org/',
    [Number(POLYGON_CHAIN_ID)]: 'https://rpc-mainnet.maticvigil.com'
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  //@ts-ignore
  pollingInterval: 10000
});

export const walletConnectPolygon = new WalletConnectConnector({
  rpc: {
    [Number(ETH_CHAIN_ID)]: process.env.REACT_APP_NETWORK_URL as string,
    [Number(BSC_CHAIN_ID)]: 'https://bsc-dataseed.binance.org/',
    [Number(POLYGON_CHAIN_ID)]: 'https://rpc-mainnet.maticvigil.com'
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  //@ts-ignore
  pollingInterval: 10000
});

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: MetamaskIcon,
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    // deepLink: METAMASK_DEEPLINK
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: ConnectorNames.WalletConnect,
    icon: WalletConnectIcon,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    mobile: true
  },
  BSC_WALLET: {
    connector: bscConnector,
    name: ConnectorNames.BSC,
    icon: BSCNetworkIcon,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
  },
  WALLET_LINK: {
    connector: walletLinkConnect,
    name: ConnectorNames.WalletLinkConnect,
    icon: CoinbaseWalletIcon,
    description: 'Connect to Coinbase Wallet and more...',
    href: null,
    mobile: true,
  },
};

export const SUPPORTED_WALLETS_BSC: { [key: string]: WalletInfo } = {
  METAMASK: SUPPORTED_WALLETS.METAMASK,
  BSC_WALLET: SUPPORTED_WALLETS.BSC_WALLET,
  WALLET_CONNECT: {
    connector: walletConnectBsc,
    name: ConnectorNames.WalletConnect,
    icon: WalletConnectIcon,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
  },
}

export const SUPPORTED_WALLETS_POLYGON: { [key: string]: WalletInfo } = {
  METAMASK: SUPPORTED_WALLETS.METAMASK,
  WALLET_CONNECT: {
    connector: walletConnectPolygon,
    name: ConnectorNames.WalletConnect,
    icon: WalletConnectIcon,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
  },
}

export const connectorsByName: { [key in ConnectorNames]: AbstractConnector } = {
  [ConnectorNames.MetaMask]: injected,
  [ConnectorNames.BSC]: bscConnector,
  // [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletConnectBsc]: walletConnectBsc,
  [ConnectorNames.WalletConnectPolygon]: walletConnectPolygon,
  [ConnectorNames.WalletLinkConnect]: walletLinkConnect,
}

export const connectorsSupportByNetwork: {[key: string]: { [key:string]: WalletInfo }  } = {
  [APP_NETWORKS_NAME.METAMASK]: SUPPORTED_WALLETS,
  [APP_NETWORKS_NAME.BSC]: SUPPORTED_WALLETS_BSC,
  [APP_NETWORKS_NAME.POLYGON]: SUPPORTED_WALLETS_POLYGON,
};