import {removeTeamMember} from "@app/api/team/remove-member";
import { confirm } from '@app/dekits/modal'
import { useCallback, useState } from 'react';

export function TeamMemberCard(props) {
  const removeMember = useCallback((values) => {
    confirm({ content: `Are you sure you want to remove this user?` }).subscribe(answer => {
      if (!answer) return;

      removeTeamMember({team_id: props.team_id, member: props.memberInfo._id}).subscribe(res => {
        if(res.code == 200)
          props.onrefresh()
      });
    })
  }, []);

  return (
    <div className='de-team-member-card online w-100'>
      <div className='member-avatar'>
        {props.memberInfo.avatar ? <img src={props.memberInfo.avatar} alt={props.memberInfo.username} /> : <></>}
      </div>
      <div className='member-info'>
        <div className='member-name'>
          <span>{props.memberInfo.username}</span>
          {props.isCaptain && <span className='de-tag gradient-solid de-mb-0 de-ms-1 team-detail_deTeamTag__PpUTh'>Captain</span>}
          <div className='member-status online'></div>
        </div>
        <div className='member-description'>Playing PUBG Mobile</div>
        {
          (props.readOnly || props.isCaptain) ?
            <></> 
            :
            <button onClick={removeMember} type='button' className='member-kick'>
              <span>Kick</span>
            </button>
        }
      </div>
    </div>
  )
}
