import {getTeamDetail, TeamData} from "@app/api/team/team-info";
import {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import styles from './index.module.scss';
import {useSubscription} from "@app/hooks/subscription";

export function TeamDetail({team, teamId}: { team: TeamData | null, teamId: string }) {
  const [teamInfo, setTeamInfo] = useState(team);
  const subscription = useSubscription();
  useEffect(() => {
    if (team === null && teamId) {
      const data = getTeamDetail(teamId).subscribe(res => {
        setTeamInfo(res.data);
      });
      subscription.add(data);
    } else {
      if (team !== null) {
        setTeamInfo(team);
      }
    }
  }, []);
  return (
    <div className={styles.deTeamDetail}>
      <div className='de-team-banner-simple' style={{backgroundImage: 'url("/assets/images/tournament-banner.png")'}}>
        <div className='team-banner-inner'>
          <div className='team-banner-logo'>
            <img src={teamInfo?.logo} alt=''/>
          </div>
        </div>
      </div>

      <div className={styles.deTeamName}>{teamInfo?.name}</div>
      <div className={styles.deTeamStats}>
        <div className={styles.deTeamStat}>
          <div className={`de-tag dark ${styles.deTeamTag}`}>Country</div>
          <div><img src='/assets/images/flags/Vietnam.png' alt='vi' height={15}/></div>
        </div>
        <div className={styles.deTeamStat}>
          <div className={`de-tag secondary ${styles.deTeamTag}`}>Members</div>
          <div>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.00033 9.16667C7.24217 9.16667 6.50103 8.94185 5.87064 8.52064C5.24025 8.09942 4.74892 7.50074 4.45879 6.80029C4.16865 6.09984 4.09274 5.32908 4.24065 4.58549C4.38856 3.84189 4.75365 3.15886 5.28975 2.62276C5.82585 2.08666 6.50889 1.72157 7.25248 1.57366C7.99608 1.42575 8.76683 1.50166 9.46728 1.7918C10.1677 2.08193 10.7664 2.57326 11.1876 3.20365C11.6088 3.83404 11.8337 4.57517 11.8337 5.33333C11.8319 6.34946 11.4275 7.32346 10.709 8.04196C9.99045 8.76047 9.01645 9.16491 8.00033 9.16667ZM8.00033 2.5C7.43995 2.5 6.89215 2.66617 6.42621 2.9775C5.96027 3.28884 5.59712 3.73134 5.38267 4.24907C5.16822 4.76679 5.11211 5.33648 5.22144 5.88609C5.33076 6.4357 5.60061 6.94056 5.99686 7.3368C6.39311 7.73305 6.89796 8.0029 7.44757 8.11223C7.99718 8.22155 8.56687 8.16544 9.0846 7.95099C9.60232 7.73655 10.0448 7.37339 10.3562 6.90745C10.6675 6.44151 10.8337 5.89372 10.8337 5.33333C10.8319 4.58243 10.5328 3.86278 10.0019 3.33181C9.47088 2.80084 8.75123 2.50176 8.00033 2.5Z'
                fill='white'/>
              <path
                d='M14 14.4998C13.8679 14.4981 13.7418 14.4449 13.6484 14.3515C13.555 14.2581 13.5017 14.1319 13.5 13.9998C13.4982 12.7185 12.9884 11.4901 12.0824 10.5841C11.1764 9.67806 9.948 9.16827 8.66667 9.1665H7.33333C6.052 9.16827 4.82364 9.67806 3.9176 10.5841C3.01155 11.4901 2.50176 12.7185 2.5 13.9998C2.5 14.1324 2.44732 14.2596 2.35355 14.3534C2.25979 14.4472 2.13261 14.4998 2 14.4998C1.86739 14.4998 1.74021 14.4472 1.64645 14.3534C1.55268 14.2596 1.5 14.1324 1.5 13.9998C1.50176 12.4533 2.11691 10.9706 3.21049 9.877C4.30407 8.78342 5.78678 8.16827 7.33333 8.1665H8.66667C10.2132 8.16827 11.6959 8.78342 12.7895 9.877C13.8831 10.9706 14.4982 12.4533 14.5 13.9998C14.4983 14.1319 14.445 14.2581 14.3516 14.3515C14.2582 14.4449 14.1321 14.4981 14 14.4998Z'
                fill='#E59C50'/>
            </svg>
            <span className={styles.deTeamMembers}>{teamInfo?.memberInfo?.length || 0}</span>
          </div>
        </div>
        <div className={styles.deTeamStat}>
          <div className={`de-tag gradient-solid ${styles.deTeamTag}`}>Captain</div>
          <div className={styles.deTeamCaptain}>{teamInfo?.captainInfo?.name}</div>
        </div>
      </div>

      <div className='de-card de-pt-4 de-px-5 de-pb-2'>
        <div className='de-card-header'>
          <div className='de-card-title opacity-50'>Team Members</div>
          <button type='button' className='de-btn de-btn-sm de-btn-secondary'>
            <span>Edit</span>
          </button>
        </div>
        <div className='de-card-body'>
          <div className={styles.deTeamMemberList}>
            <Row className='de-gx-3'>
              {teamInfo && teamInfo.memberInfo?.length &&
                teamInfo.memberInfo.map(m =>
                  <Col xl='3' lg='4' md='6' key={m._id}>
                    <a className='text-decoration-none' href='#'>
                      <div className='de-user-card de-mb-3 de-user-card-bordered w-100'>
                        <div className='de-user-card-avatar'>
                          <img src={m.avatar} alt={m.name}/>
                        </div>
                        <div className='de-user-card-info'>
                          <div className='de-user-card-username d-flex align-items-center flex-wrap de-mb-1'>
                            <span>{m.name}</span>
                            {m._id === teamInfo.captain && <span className={`de-tag gradient-solid de-mb-0 de-ms-1 ${styles.deTeamTag}`}>Captain</span>}
                            <img className='de-ms-1' src='/assets/images/flags/Vietnam.png' alt='vi' height={16}/>
                            <svg className='de-ms-1' width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle cx='4' cy='4.5' r='4' fill='#609A5B'/>
                            </svg>
                          </div>
                          {/*<div className='de-user-card-title'>Playing PUBG Mobile</div>*/}
                        </div>
                      </div>
                    </a>
                  </Col>)}
            </Row>
          </div>
        </div>
      </div>

      {/*<DePagination />*/}

      {/* <div>Team Icon</div>
      <div><img src='/assets/images/flags/Vietnam.png' alt='Vietnam' /> {teamInfo?.name} </div>
      {teamInfo?.members.map(member => <div key={member._id}>{member.name}</div>)} */}
    </div>
  )
}
