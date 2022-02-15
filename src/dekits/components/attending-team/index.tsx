import React from 'react';

export function AttendingTeam(props: any) {
  return (
    <div className='de-attending-team'>
      <div className='de-attending-team-logo'>
        <img src={props.logo} alt='' />
      </div>
      <div className='de-attending-team-name'>{props.name}</div>
    </div>
  )
}
