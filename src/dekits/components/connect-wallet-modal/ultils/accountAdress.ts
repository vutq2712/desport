import { ethers } from "ethers";
import { CHAIN_IDS, RPC_URL } from "../connectors";

export const trimMiddlePartAddress = (address: string, digits: number = 5) => {
  return `${address.substring(0, digits)}...${address.substring(address.length - 4, address.length)}`
}

export const getAccountBalance = async (appChainID: string, walletChainID: string, connectedAccount: string, connector: string) => {
  if (appChainID && connectedAccount && connector) {
    const exactNetwork = appChainID === walletChainID;
  
    const provider = (() => {
      switch (appChainID) {
      case `${CHAIN_IDS.REACT_APP_BSC_CHAIN_ID}`:
        return new ethers.providers.JsonRpcProvider(RPC_URL.BSC_RPC_URL);
      case `${CHAIN_IDS.REACT_APP_POLYGON_CHAIN_ID}`:
        return new ethers.providers.JsonRpcProvider(RPC_URL.POLYGON_RPC_URL);
      case `${CHAIN_IDS.REACT_APP_ETH_CHAIN_ID}`:
      default:
        return new ethers.providers.JsonRpcProvider(RPC_URL.ETH_RPC_URL);
      }
    })();
  
    const accountBalance = exactNetwork 
      ? await provider.getBalance(connectedAccount)
      : { _hex: '0x00' }
  
    return accountBalance; 
  }
    
  return { _hex: '0x00' };
}
