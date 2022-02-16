import { BSCNetworkIcon } from "@app/dekits/icons/bsc-network-icon";
import { EthereumNetworkIcon } from "@app/dekits/icons/ethereum-network-icon";
import { PolygonNetworkIcon } from "@app/dekits/icons/polygon-network-icon";
import { ConnectorNames } from ".";

export const ETH_CHAIN_ID = process.env.REACT_APP_ETH_CHAIN_ID as string;
export const BSC_CHAIN_ID = process.env.REACT_APP_BSC_CHAIN_ID as string;
export const POLYGON_CHAIN_ID = process.env.REACT_APP_POLYGON_CHAIN_ID as string;

export const NETWORK_NAME_MAPPINGS: any = {
  '1': 'Mainnet',
  '3': 'Ropsten',
  '5': 'Goerli',
  '42': 'Kovan',
  '4': 'Rinkeby',
  '56': 'BSC Mainnet',
  '97': 'BSC Testnet',
  '137': 'Polygon Mainnet',
  '80001': 'Mumbai Testnet',
};


export interface NetworkInfo {
  name: string;
  id?: any;
  icon: any,
  disableIcon?: string,
  currency?: string,
  [k: string]: any,
}

export enum APP_NETWORKS_NAME {
  METAMASK = "METAMASK",
  BSC = "BSC",
  POLYGON = "POLYGON",
}

export type appNetworkType = Extract<APP_NETWORKS_NAME, APP_NETWORKS_NAME.METAMASK | APP_NETWORKS_NAME.BSC | APP_NETWORKS_NAME.POLYGON>

export const APP_NETWORKS: {[key in APP_NETWORKS_NAME]: NetworkInfo } = {
  [APP_NETWORKS_NAME.METAMASK]: {
    name: 'Ethereum',
    id: ETH_CHAIN_ID,
    icon: EthereumNetworkIcon,
  },
  [APP_NETWORKS_NAME.BSC]: {
    name: 'BSC',
    id: BSC_CHAIN_ID,
    icon: BSCNetworkIcon,
  },
  [APP_NETWORKS_NAME.POLYGON]: {
    name: 'Polygon',
    id: POLYGON_CHAIN_ID ,
    icon: PolygonNetworkIcon,
  },
}

export const APP_NETWORKS_SUPPORT: {[key: number]: NetworkInfo } = {
  [ETH_CHAIN_ID]: {
    name: 'Ethereum',
    id: ETH_CHAIN_ID,
    icon: "/images/ethereum.svg",
    disableIcon: "/images/ethereum-disabled.png",
    currency: 'ETH',
    networkName: NETWORK_NAME_MAPPINGS[ETH_CHAIN_ID],
    details: {
      chainId: `0x${(+ETH_CHAIN_ID).toString(16)}`,
      chainName: NETWORK_NAME_MAPPINGS[ETH_CHAIN_ID],
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [],
      blockExplorerUrls: [],
    }
  },
  [BSC_CHAIN_ID]: {
    name: 'BSC Mainnet',
    id: BSC_CHAIN_ID ,
    icon: "/images/bsc.svg",
    disableIcon: "/images/binance-disabled.png",
    currency: 'BNB',
    networkName: NETWORK_NAME_MAPPINGS[BSC_CHAIN_ID],
    details: {
      chainId: `0x${(+BSC_CHAIN_ID).toString(16)}`,
      chainName: NETWORK_NAME_MAPPINGS[BSC_CHAIN_ID],
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_BSC_RPC_URL],
      blockExplorerUrls: [process.env.REACT_APP_BSCSCAN_BASE_URL],
    }
  },
  [POLYGON_CHAIN_ID]: {
    name: 'Polygon',
    id: POLYGON_CHAIN_ID,
    icon: "/images/polygon-matic.svg",
    disableIcon: "/images/polygon-matic-disabled.svg",
    currency: 'MATIC',
    networkName: NETWORK_NAME_MAPPINGS[POLYGON_CHAIN_ID],
    details: {
      chainId: `0x${(+POLYGON_CHAIN_ID).toString(16)}`,
      chainName: NETWORK_NAME_MAPPINGS[POLYGON_CHAIN_ID],
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_POLYGON_RPC_URL],
      blockExplorerUrls: [process.env.REACT_APP_POLSCAN_BASE_URL],
    }
  },
}


export const requestSupportNetwork = async (chainId: string, walletName: string) => {
  const provider = walletName === ConnectorNames.MetaMask ? (window as any).ethereum : (window as any).BinanceChain;
  if (provider) {
    try {
      const networkInfo = APP_NETWORKS_SUPPORT[+chainId];
      if(walletName === ConnectorNames.MetaMask && networkInfo) {
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkInfo.details?.chainId }],
          });
        } catch (error: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (error.code === 4902) {
            try {
              await provider.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    ...(networkInfo.details || {})
                  }]
                });
              } catch (addError) {
                console.log("requestSupportNetwork", addError);
                console.error(addError)
                return false;
              }
          } else {
            return false;
          }

      }
    }

      return true
    } catch (error: any) {
      console.log("requestSupportNetwork", error.message);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}
