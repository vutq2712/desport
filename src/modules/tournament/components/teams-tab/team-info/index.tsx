import {TeamInfoData} from '@app/api/tournament/team-detail/list-teams';
import {useRef, useState} from "react";
interface TeamInfoProps {
  showLineups: boolean,
  info: TeamInfoData
}

export function TeamInfo({showLineups, info}: TeamInfoProps) {

  const myRef = useRef();

  // const width = myRef.current.clientWidth;
  //
  // const height = myRef.current ? myRef.current.clientHeigh : 0;
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  return (
    <div className={`de-tournament-team-card`}>
      <div className={`de-tournament-team-card-inner`}>
        <div className={`de-attending-team`}>
          <div className={`de-attending-team-logo`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
          <div className={`de-attending-team-name`}>{info.name}</div>
        </div>
      </div>
      <div className={`de-tournament-team-lineup`} >
        <div className={`de-attending-team-logo`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
        <div className={`de-attending-team-name`}>{info.name}</div>
        <div className={`de-tournament-team-members`}>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
          <div className={`member-info`}>
            <div className={`member-avatar`}><img src='/assets/images/team-logo-1.png' alt={info.name}/></div>
            <div>
              <div className={`member-name`}>Dash
                <span className={`badge captain`}>Captain</span>
                <img className={`member-flag`} src='/assets/images/flags/Vietnam.png' alt='Vietnam'/>
                <div className={`online-status`}>&nbsp;</div>
              </div>
              {/*<div className={`game-status`}>Playing PUBG Mobile</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
