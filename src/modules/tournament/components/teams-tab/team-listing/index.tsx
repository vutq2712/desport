import { FormWrapper, Input } from "@app/dekits/form";
import Link from "next/link";
import { TeamInfo } from "@app/modules/tournament/components/teams-tab/team-info";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getParticipateTeams, TeamInfoData } from "@app/api/tournament/team-detail/list-teams";
import { useSubscription } from '@app/hooks/subscription';
import { SearchIcon } from "@app/dekits/icons/search-icon";
import { TeamSmallCard } from "@app/dekits/components/team-small-card";
import {useTournamentContext} from "@app/modules/tournament/context/tournament-context";

interface SearchTeamFormValue {
  key: string;
}

interface TeamListingProps {
  tab: string,
  handleClickTeam: (e) => void;
}

export function TeamListing(props: TeamListingProps) {
  const tournamentCtx = useTournamentContext();
  const subscription = useSubscription();
  const initialValues = useMemo<SearchTeamFormValue>(() => ({
    key: '',
  }), []);

  const [teams, setTeams] = useState<TeamInfoData[]>([]);
  const [showLineups, setShowLineups] = useState(false);
  const toggleLineup = useCallback(() => {
    setShowLineups(!showLineups);
  }, [showLineups]);


  useEffect(() => {
    const tourId = tournamentCtx.detail._id;
    getParticipateTeams(tourId, '').subscribe(res => {
      setTeams(res.data);
    });
  }, [subscription])


  const handleFilter = useCallback((values: SearchTeamFormValue) => {
    // let tourId = router.query.tournamenId;
    const tourId = tournamentCtx.detail._id;
    const getParticipateTeamsSub = getParticipateTeams(tourId, values.key).subscribe(res => {
      setTeams(res.data);
    });

    subscription.add(getParticipateTeamsSub);
  }, [subscription]);

  return (
    <div className='de-card de-team-listing'>
      <div className='de-card-header'>
        <div className='de-card-title'>All TeamS</div>
        <FormWrapper<SearchTeamFormValue>
          initialValues={initialValues}
          onSubmit={handleFilter}>
          <div className='d-flex'>
            <Input name='key' placeholder='Search for teams or players...' icon={SearchIcon} />
            <button type='submit' className='de-btn de-btn-search de-btn-outline-secondary de-ms-2'>
              <span>Search</span>
            </button>
          </div>
        </FormWrapper>
      </div>
      <div className='de-card-body'>
        <div className='de-all-teams' style={{display: 'flex', flexWrap: 'wrap'}}>
          {teams.length > 0 && teams.map(t => {
            if(t._id) {
              return (<Link href={`/tournament/${tournamentCtx.detail._id}?tab=${props.tab}&team_id=${t.team_master}`} key={t.team_master}>
                <a className='text-decoration-none' style={{flex: '0 0 16%'}} onClick={() => {
                  props.handleClickTeam(t)
                }}>
                  {/* <TeamInfo showLineups={showLineups} info={t} /> */}
                  <TeamSmallCard data={t}/>
                </a>
              </Link>);
            }
          })}
        </div>
      </div>

      {/*<button onClick={toggleLineup} type='button' className='de-btn de-btn-sm de-btn-outline-secondary de-mt-4' tabIndex={-1}>*/}
      {/*  Show Lineup*/}
      {/*</button>*/}
    </div>
  )
}
