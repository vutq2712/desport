import React from "react";

export function NetworkItem(props: any) {
  return (
    <button type='button' className={`de-network-item de-mb-3 ${props.selected ? 'active' : ''}`} onClick={props.onSelect}>
      <div className='de-network-logo'>
        {React.createElement(props.icon)}
      </div>
      <div className='de-network-name'>{props.name}</div>
    </button>
  )
}
