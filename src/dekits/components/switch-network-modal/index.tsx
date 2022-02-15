import { BSCNetworkIcon } from "@app/dekits/icons/bsc-network-icon";
import { EthereumNetworkIcon } from "@app/dekits/icons/ethereum-network-icon";
import { PolygonNetworkIcon } from "@app/dekits/icons/polygon-network-icon";
import { useState } from "react";
import { NetworkItem } from "../network-item";

export function SwitchNetworkModal(props: any) {
  const { modalRef } = props;
  const [selectedNetwork, setSelectedNetwork] = useState(-1);

  return (
    <div className='modal-body'>
      <div className='modal-title de-mb-4'>Switch Network</div>
      <div className='modal-inner'>
        <div className='row de-gx-3'>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedNetwork === 1} onSelect={() => setSelectedNetwork(1)} icon={EthereumNetworkIcon} name='Ethereum' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedNetwork === 2} onSelect={() => setSelectedNetwork(2)} icon={BSCNetworkIcon} name='BSC' />
          </div>
          <div className='col-md-4 col-6'>
            <NetworkItem selected={selectedNetwork === 3} onSelect={() => setSelectedNetwork(3)} icon={PolygonNetworkIcon} name='Polygon' />
          </div>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
        <button type='submit' disabled={selectedNetwork === -1} className='de-btn de-btn-outline-primary w-100'>DISCONNECT</button>
      </div>
    </div>
  )
}
