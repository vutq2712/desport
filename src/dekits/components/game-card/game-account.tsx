import React from 'react';

export function GameAccount(props: any) {
  return (
    <div className='game-info-header'>
      <div className='tag'><span>Unbind account</span></div>
      <div className='username'>{props.data.profile_name}</div>
    </div>
  )
}
