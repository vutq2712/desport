import { InjectedConnector } from '@web3-react/injected-connector'


export enum CHAIN_IDS{
  REACT_APP_ETH_CHAIN_ID=5,
  REACT_APP_BSC_CHAIN_ID=97,
  REACT_APP_POLYGON_CHAIN_ID=80001,
}

export enum RPC_URL{
  ETH_RPC_URL='https://goerli.infura.io/v3/e267dd5ef60949ba9bb3195ccacde657',
  BSC_RPC_URL='https://data-seed-prebsc-1-s1.binance.org:8545/',
  POLYGON_RPC_URL='https://rpc-mumbai.maticvigil.com/',
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})