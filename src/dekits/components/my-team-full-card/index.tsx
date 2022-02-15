import { useState, useCallback } from "react";
import { ButtonCollapse } from "../button-collapse";
import { GameSmallCard } from "../game-small-card";
import { MyTeamFullMembers } from "./team-member";
import { MyTeamFullStats } from "./team-stats";
import { confirm } from '@app/dekits/modal'
import { leaveTeam } from "@app/api/team/leave";

export function MyTeamFullCard(props: any) {
  const [collapsed, setCollapsed] = useState(props.showCollapse ? false : true);

  const handleLeave = useCallback(() => {
    confirm({ content: `Are you sure you want to leave this team?` }).subscribe(answer => {
      if (!answer) return;
      
      leaveTeam(props.teamInfo._id).subscribe(res => {
        if(res.code == 200)
          props.onrefresh();
      },(error) => {
        alert(error?.msg || 'Error');
      })
    })
  }, []);

  return (
    <div className={`de-team-full-card w-100 ${collapsed ? 'collapsed' : ''}`}>
      <div className='row'>
        <div className='col-xl-1 col-lg-2 col-md-3'>
          <div className='team-full-logo'>
            {props.teamInfo.logo ? <img src={props.teamInfo.logo} alt={props.teamInfo.name} /> : <></>}
          </div>
        </div>
        <div className='col-xl-11 col-lg-2 col-md-9'>
          <div className='row de-mb-3'>
            <div className='col-md-8 de-mb-3 de-mb-md-0'>
              <div className='de-mb-2'>
                <h2 className='team-full-name'>{props.teamInfo.name}</h2>
              </div>
              <GameSmallCard logo={props.teamInfo.game[0].logo} name={props.teamInfo.game[0].display_name} />
            </div>
            <div className='col-md-4'>
              <div className='de-team-full-card-action d-flex align-items-center justify-content-md-end'>
                {
                  props.readOnly ? 
                    <button onClick={handleLeave} type='button' className='de-btn de-btn-sm de-btn-fw de-btn-outline-secondary'>
                      <span>Leave</span>
                    </button>
                    :
                    <button onClick={props.onEdit} type='button' className='de-btn de-btn-sm de-btn-fw de-btn-outline-secondary de-me-1'>
                      <span>Edit Profile</span>
                    </button>
                }
                {
                  <ButtonCollapse collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
                }
              </div>
            </div>
          </div>
          <div className='de-team-full-card-body'>
                    
            <MyTeamFullStats />
            <MyTeamFullMembers onrefresh= {props.onrefresh} team_id= {props.teamInfo._id} members = {props.teamInfo.members} onViewDetail={props.onViewDetail} isListingPage={props.isListingPage} readOnly={props.readOnly} captain={props.teamInfo.captain}/>
          </div>
        </div>
      </div>
    </div>
  )
}
