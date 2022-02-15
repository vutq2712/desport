import { DePagination, PageChangeData } from "@app/dekits/pagination";
import { useEffect, useState, useCallback } from "react";
import { RoundDetail } from "./round-detail";
import { getMatchesOfBracket, MatchesData, MatchInfoData } from "@app/api/tournament/overview/get-bracket-matches";
import { useSubscription } from '@app/hooks/subscription';
import { MatchInfo } from "./match-info";

export interface MatchesListParams {
  tournament_name: string,
  bracket_id: string
}

export function MatchesList({tournament_name, bracket_id}: MatchesListParams) {
  const [viewDetailRound, setViewDetailMatch] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("A");
  const [matches, setMatches]  = useState<MatchInfoData[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);
  const [teamToSeach, setTeamToSearch] = useState()

  const subscription = useSubscription();
  const [selectedMatch, setSelectedMatch] = useState()

  const showDetail = useCallback((info) => {
    setViewDetailMatch(true);
    setSelectedMatch(info);
  },[]);

  const handlePageChange = useCallback((data: PageChangeData) => {
    setCurrentPage(data.page);
    getBracketMatches(selectedStatus);
  }, [])


  const getBracketMatches = useCallback((status) => {
    const getMatches = getMatchesOfBracket({ bracket_id: bracket_id, page:currentPage, limit: 2, status: status })
      .subscribe(res => {
        setMatches(res.data.matches);
        setTotalMatches(res.data.total);
      });
    subscription.add(getMatches);
  },[subscription, bracket_id, currentPage]);

  const onchangeStatus = (selectedStatus) =>{
    setCurrentPage(1);
    setSelectedStatus(selectedStatus);
    getBracketMatches(selectedStatus);
  }

  const handleFilter = ()=>{
    getBracketMatches(selectedStatus);
  }

  useEffect(() => {
    getBracketMatches(selectedStatus);
  }, [subscription, currentPage, bracket_id, tournament_name]);
  
  return (
    <div className='de-matches-info'>
      {
        !viewDetailRound ? <>
          <div className='de-bracket-tab-content de-mb-3'>
            <div className='row de-mb-2'>
              <div className='col-lg-4'>
                <div className='de-form-group form-group'>
                  <div className='de-form-control-with-icon'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M9.75 17.27C8.26664 17.27 6.8166 16.8302 5.58323 16.006C4.34986 15.1819 3.38856 14.0106 2.82091 12.6401C2.25325 11.2697 2.10472 9.7617 2.39411 8.30685C2.6835 6.85199 3.39781 5.51562 4.4467 4.46672C5.4956 3.41783 6.83197 2.70352 8.28683 2.41413C9.74168 2.12474 11.2497 2.27327 12.6201 2.84093C13.9906 3.40858 15.1619 4.36988 15.986 5.60325C16.8101 6.83661 17.25 8.28666 17.25 9.77002C17.25 11.7591 16.4598 13.6668 15.0533 15.0733C13.6468 16.4798 11.7391 17.27 9.75 17.27ZM9.75 3.77002C8.56332 3.77002 7.40328 4.12192 6.41658 4.78121C5.42989 5.44049 4.66085 6.37757 4.20673 7.47392C3.7526 8.57028 3.63378 9.77668 3.86529 10.9406C4.0968 12.1045 4.66825 13.1735 5.50736 14.0127C6.34648 14.8518 7.41558 15.4232 8.57946 15.6547C9.74335 15.8862 10.9497 15.7674 12.0461 15.3133C13.1425 14.8592 14.0795 14.0901 14.7388 13.1034C15.3981 12.1167 15.75 10.9567 15.75 9.77002C15.75 8.17872 15.1179 6.6526 13.9926 5.52738C12.8674 4.40216 11.3413 3.77002 9.75 3.77002Z' fill='white' />
                      <path d='M21 21.7699C20.9015 21.7704 20.8039 21.7512 20.7128 21.7134C20.6218 21.6756 20.5393 21.6201 20.47 21.5499L14 15.0699C13.9258 15.0019 13.8661 14.9197 13.8244 14.8281C13.7826 14.7366 13.7598 14.6375 13.7571 14.5369C13.7544 14.4363 13.7721 14.3362 13.8089 14.2425C13.8457 14.1489 13.901 14.0636 13.9715 13.9918C14.042 13.92 14.1262 13.863 14.2192 13.8244C14.3121 13.7858 14.4119 13.7663 14.5125 13.7671C14.6131 13.7679 14.7126 13.7889 14.8049 13.8289C14.8973 13.8689 14.9806 13.9271 15.05 13.9999L21.53 20.4799C21.6705 20.6206 21.7494 20.8112 21.7494 21.0099C21.7494 21.2087 21.6705 21.3993 21.53 21.5399C21.4616 21.6119 21.3795 21.6693 21.2884 21.7088C21.1974 21.7483 21.0993 21.7691 21 21.7699Z' fill='white' />
                    </svg>
                    <input value={teamToSeach} onChange={handleFilter} className='de-form-control form-control' placeholder='Search team name...' />
                  </div>
                </div>
              </div>
              <div className='col-lg-8 text-lg-end'>
                <button type='button' className={`de-right-card-tab ${selectedStatus === 'A' ? 'active' : ''}`} onClick={() => onchangeStatus('A')}>
                  <span>All Status</span>
                </button>
                <button type='button' className={`de-right-card-tab ${selectedStatus === 'C' ? 'active' : ''}`} onClick={() => onchangeStatus('C')}>
                  <span>Finished</span>
                </button>
                <button type='button' className={`de-right-card-tab ${selectedStatus === 'P' ? 'active' : ''}`} onClick={() => onchangeStatus('P')}>
                  <span>On-going</span>
                </button>
                <button type='button' className={`de-right-card-tab ${selectedStatus === 'W' ? 'active' : ''}`} onClick={() => onchangeStatus('W')}>
                  <span>Upcoming</span>
                </button>
              </div>
            </div>

            <div className='table-responsive'>
              <table className='table de-table table-borderless mb-0'>
                <tbody>
                  {matches && matches.map(match => 
                    <MatchInfo key={match._id} setViewDetailMatch={() => showDetail(match)} info={match} />)                 
                  }
                </tbody>
              </table>
            </div>
          </div>
          {totalMatches > 0 && <DePagination currentPage={currentPage} pageSize={2} totalItems={totalMatches} onPageChange={handlePageChange} className='de-mx-4' />}
        </> : <div className='de-bracket-tab-content'>
          <RoundDetail tournament_name={tournament_name} info={selectedMatch} />
        </div>
      }
    </div>
  )
}
