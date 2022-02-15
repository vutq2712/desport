import { Accordion } from "react-bootstrap"
import { BracketData } from "@app/api/bracket/list-bracket"
import { BracketStatus, BracketFormat } from '@app/types/bracket.type';
import { useCallback, useMemo } from "react";

interface BracketCardProps {
  bracket: BracketData;
  collapsed?: boolean;
  onClickView?: (bracketId: string) => void;
}

/**
 * TODO: should move this component to specific page?
 */
export function BracketCard(props: BracketCardProps) {
  // TODO: i18n
  const BRACKET_STATUS = useMemo(() => ({
    [BracketStatus.ONGOING]: { type: 'success', label: 'On-going' },
    [BracketStatus.FINISHED]: { type: 'primary', label: 'Ended' },
    [BracketStatus.STANDBY]: { type: 'primary', label: 'Stand By' },
    [BracketStatus.UPCOMING]: { type: 'warning', label: 'Upcoming' },
  }), []);

  // TODO: i18n
  const BRACKET_FORMAT = useMemo(() => ({
    [BracketFormat.SINGLE_ELIMINATION]: 'Single Elimination',
    [BracketFormat.BATTLE_ROYAL]: 'Battle Royal',
    [BracketFormat.ROUND_ROBIN]: 'Round Robin',
    [BracketFormat.SWISS]: 'Swiss',
  }), []);

  const handleViewBracket = useCallback((bracketId: string) => () => {
    props.onClickView &&
      props.onClickView(bracketId);
  }, [props.onClickView]);

  const { bracket } = props;

  return (
    <div className={`de-card de-bracket-card ${BRACKET_STATUS[bracket.status]?.type}`}>
      <div className='de-bracket-card-header'>
        <span className='de-bracket-card-logo'>
          <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M18.79 12.32C18.6912 12.3222 18.593 12.3038 18.5018 12.2659C18.4105 12.228 18.3282 12.1715 18.26 12.1L13.05 6.89996C12.9175 6.75779 12.8454 6.56974 12.8488 6.37544C12.8522 6.18114 12.931 5.99576 13.0684 5.85834C13.2058 5.72093 13.3912 5.64222 13.5855 5.63879C13.7798 5.63536 13.9678 5.70748 14.11 5.83996L19.32 11.04C19.4604 11.1806 19.5393 11.3712 19.5393 11.57C19.5393 11.7687 19.4604 11.9593 19.32 12.1C19.2507 12.1701 19.1682 12.2257 19.0772 12.2634C18.9862 12.3012 18.8885 12.3204 18.79 12.32Z' fill='#609A5B' />
            <path d='M13.63 12.27C13.5314 12.2704 13.4338 12.2512 13.3428 12.2134C13.2517 12.1757 13.1692 12.1201 13.1 12.05C12.9595 11.9094 12.8806 11.7187 12.8806 11.52C12.8806 11.3212 12.9595 11.1306 13.1 10.99L18.31 5.78998C18.3789 5.71922 18.4613 5.66298 18.5523 5.62459C18.6434 5.58619 18.7412 5.56641 18.84 5.56641C18.9387 5.56641 19.0365 5.58619 19.1276 5.62459C19.2186 5.66298 19.301 5.71922 19.37 5.78998C19.5104 5.9306 19.5893 6.12123 19.5893 6.31998C19.5893 6.51873 19.5104 6.70935 19.37 6.84998L14.16 12.05C14.0911 12.1205 14.0086 12.1764 13.9175 12.2142C13.8264 12.252 13.7286 12.271 13.63 12.27Z' fill='currentColor' />
            <path d='M7.78997 12.3C7.12147 12.3 6.46799 12.1018 5.91215 11.7304C5.35631 11.359 4.92309 10.8311 4.66726 10.2135C4.41144 9.5959 4.3445 8.91629 4.47492 8.26064C4.60534 7.60498 4.92725 7.00272 5.39995 6.53002C5.87266 6.05732 6.47491 5.7354 7.13057 5.60499C7.78623 5.47457 8.46583 5.5415 9.08345 5.79733C9.70106 6.05315 10.2289 6.48637 10.6003 7.04221C10.9717 7.59805 11.17 8.25154 11.17 8.92004C11.1673 9.81566 10.8104 10.6738 10.1771 11.3071C9.54378 11.9404 8.6856 12.2974 7.78997 12.3ZM7.78997 7.04004C7.41815 7.04004 7.05467 7.1503 6.7455 7.35688C6.43634 7.56345 6.19537 7.85707 6.05308 8.2006C5.91079 8.54412 5.87356 8.92213 5.9461 9.28681C6.01864 9.65149 6.19769 9.98648 6.46061 10.2494C6.72354 10.5123 7.05852 10.6914 7.4232 10.7639C7.78789 10.8365 8.16589 10.7992 8.50942 10.6569C8.85294 10.5146 9.14656 10.2737 9.35314 9.96451C9.55971 9.65535 9.66997 9.29187 9.66997 8.92004C9.66997 8.42143 9.4719 7.94325 9.11934 7.59068C8.76677 7.23811 8.28858 7.04004 7.78997 7.04004Z' fill='white' />
            <path d='M7.78997 20.5002C7.12147 20.5002 6.46799 20.302 5.91215 19.9306C5.35631 19.5592 4.92309 19.0313 4.66726 18.4137C4.41144 17.7961 4.3445 17.1165 4.47492 16.4608C4.60534 15.8052 4.92725 15.2029 5.39995 14.7302C5.87266 14.2575 6.47491 13.9356 7.13057 13.8052C7.78623 13.6748 8.46583 13.7417 9.08345 13.9975C9.70106 14.2533 10.2289 14.6866 10.6003 15.2424C10.9717 15.7982 11.17 16.4517 11.17 17.1202C11.1673 18.0159 10.8104 18.874 10.1771 19.5073C9.54378 20.1406 8.6856 20.4976 7.78997 20.5002ZM7.78997 15.2402C7.41815 15.2402 7.05467 15.3505 6.7455 15.5571C6.43634 15.7636 6.19537 16.0573 6.05308 16.4008C5.91079 16.7443 5.87356 17.1223 5.9461 17.487C6.01864 17.8517 6.19769 18.1867 6.46061 18.4496C6.72354 18.7125 7.05852 18.8916 7.4232 18.9641C7.78789 19.0367 8.16589 18.9994 8.50942 18.8571C8.85294 18.7148 9.14656 18.4739 9.35314 18.1647C9.55971 17.8555 9.66997 17.4921 9.66997 17.1202C9.66997 16.6216 9.4719 16.1434 9.11934 15.7909C8.76677 15.4383 8.28858 15.2402 7.78997 15.2402Z' fill='white' />
            <path d='M16.21 20.5002C15.5415 20.5002 14.888 20.302 14.3321 19.9306C13.7763 19.5592 13.3431 19.0313 13.0872 18.4137C12.8314 17.7961 12.7645 17.1165 12.8949 16.4608C13.0253 15.8052 13.3472 15.2029 13.8199 14.7302C14.2926 14.2575 14.8949 13.9356 15.5506 13.8052C16.2062 13.6748 16.8858 13.7417 17.5034 13.9975C18.121 14.2533 18.6489 14.6866 19.0203 15.2424C19.3917 15.7982 19.59 16.4517 19.59 17.1202C19.5873 18.0159 19.2304 18.874 18.5971 19.5073C17.9638 20.1406 17.1056 20.4976 16.21 20.5002ZM16.21 15.2402C15.8381 15.2402 15.4746 15.3505 15.1655 15.5571C14.8563 15.7636 14.6154 16.0573 14.4731 16.4008C14.3308 16.7443 14.2935 17.1223 14.3661 17.487C14.4386 17.8517 14.6177 18.1867 14.8806 18.4496C15.1435 18.7125 15.4785 18.8916 15.8432 18.9641C16.2079 19.0367 16.5859 18.9994 16.9294 18.8571C17.2729 18.7148 17.5665 18.4739 17.7731 18.1647C17.9797 17.8555 18.09 17.4921 18.09 17.1202C18.09 16.6216 17.8919 16.1434 17.5393 15.7909C17.1867 15.4383 16.7086 15.2402 16.21 15.2402Z' fill='white' />
          </svg>
        </span>
        <span className='de-bracket-card-title'>{bracket.name}</span>
        <span className={`de-tag ${BRACKET_STATUS[bracket.status]?.type}`}>{BRACKET_STATUS[bracket.status]?.label}</span>
        {/* {props.percent ? <span className={`de-bracket-card-percent ${props.percent >= 50 ? 'up' : 'down'}`}>{props.percent}%</span> : <></>} */}
        <a onClick={handleViewBracket(bracket._id)} href='#' className='de-btn de-btn-sm de-btn-secondary ms-auto'>
          <span>View</span>
        </a>
      </div>

      <div className='de-bracket-card-summary'>
        <div className='de-bracket-subinfo'>
          <label>
            <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M10 11.125C11.3583 11.125 12.5583 11.45 13.5333 11.875C14.4333 12.275 15 13.175 15 14.15V14.6667C15 15.125 14.625 15.5 14.1667 15.5H5.83333C5.375 15.5 5 15.125 5 14.6667V14.1583C5 13.175 5.56667 12.275 6.46667 11.8833C7.44167 11.45 8.64167 11.125 10 11.125ZM3.33333 11.3333C4.25 11.3333 5 10.5833 5 9.66667C5 8.75 4.25 8 3.33333 8C2.41667 8 1.66667 8.75 1.66667 9.66667C1.66667 10.5833 2.41667 11.3333 3.33333 11.3333ZM4.275 12.25C3.96667 12.2 3.65833 12.1667 3.33333 12.1667C2.50833 12.1667 1.725 12.3417 1.01667 12.65C0.4 12.9167 0 13.5167 0 14.1917V14.6667C0 15.125 0.375 15.5 0.833333 15.5H3.75V14.1583C3.75 13.4667 3.94167 12.8167 4.275 12.25ZM16.6667 11.3333C17.5833 11.3333 18.3333 10.5833 18.3333 9.66667C18.3333 8.75 17.5833 8 16.6667 8C15.75 8 15 8.75 15 9.66667C15 10.5833 15.75 11.3333 16.6667 11.3333ZM20 14.1917C20 13.5167 19.6 12.9167 18.9833 12.65C18.275 12.3417 17.4917 12.1667 16.6667 12.1667C16.3417 12.1667 16.0333 12.2 15.725 12.25C16.0583 12.8167 16.25 13.4667 16.25 14.1583V15.5H19.1667C19.625 15.5 20 15.125 20 14.6667V14.1917ZM10 5.5C11.3833 5.5 12.5 6.61667 12.5 8C12.5 9.38333 11.3833 10.5 10 10.5C8.61667 10.5 7.5 9.38333 7.5 8C7.5 6.61667 8.61667 5.5 10 5.5Z' fill='#8B5CE4' />
            </svg>
          </label>
          <span>{bracket.teams.length} team(s)</span>
        </div>
        <div className='de-bracket-subinfo'>
          <label>Format:</label>
          <span>{BRACKET_FORMAT[bracket.format]}</span>
        </div>
        <div className='de-bracket-subinfo'>
          <label>Progression:</label>
          <span>Top 2 each group to playoffs</span>
        </div>
      </div>
      <div className='de-bracket-prize-pool'>
        <Accordion defaultActiveKey={props.collapsed ? '-1' : '0'}>
          <Accordion.Item className='de-prize-pool-card' eventKey='0'>
            <Accordion.Button className='de-prize-pool-card-toggle'>Prizepool</Accordion.Button>
            <div className='de-prize-pool-stat'>
              <div className='de-sub-info-2 solid bg-orange'>
                <img src='/assets/images/busd-icon.svg' alt='busd' />
                <b>10,000</b>
                <span>B-USD</span>
              </div>
              <svg width='5' height='4' viewBox='0 0 5 4' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M2.51017 3.4C2.04351 3.4 1.64217 3.23667 1.30617 2.91C0.979505 2.574 0.816172 2.17267 0.816172 1.706C0.816172 1.23933 0.979505 0.847333 1.30617 0.53C1.64217 0.203333 2.04351 0.0399998 2.51017 0.0399998C2.97684 0.0399998 3.37351 0.203333 3.70017 0.53C4.02684 0.847333 4.19017 1.23933 4.19017 1.706C4.19017 2.17267 4.02684 2.574 3.70017 2.91C3.37351 3.23667 2.97684 3.4 2.51017 3.4Z' fill='white' />
              </svg>
              <span>50% of total prize pool</span>
            </div>
            <Accordion.Body className='de-prize-pool-card-body'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>1st</td>
                    <td>
                      <div className='de-sub-info-2 text-orange'>
                        <img src='/assets/images/btc.svg' alt='btc' />
                        <b>500</b>
                        <span>B-USD</span>
                      </div>
                    </td>
                    <td>50%</td>
                  </tr>
                  <tr>
                    <td>2nd</td>
                    <td>
                      <div className='de-sub-info-2 text-orange'>
                        <img src='/assets/images/btc.svg' alt='btc' />
                        <b>250</b>
                        <span>B-USD</span>
                      </div>
                    </td>
                    <td>25%</td>
                  </tr>
                  <tr>
                    <td>3th</td>
                    <td>
                      <div className='de-sub-info-2 text-orange'>
                        <img src='/assets/images/btc.svg' alt='btc' />
                        <b>100</b>
                        <span>B-USD</span>
                      </div>
                    </td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>4th</td>
                    <td>
                      <div className='de-sub-info-2 text-orange'>
                        <img src='/assets/images/btc.svg' alt='btc' />
                        <b>50</b>
                        <span>B-USD</span>
                      </div>
                    </td>
                    <td>5%</td>
                  </tr>
                  <tr>
                    <td>5th - 6th</td>
                    <td>
                      <div className='de-sub-info-2 text-orange'>
                        <img src='/assets/images/btc.svg' alt='btc' />
                        <b>50</b>
                        <span>B-USD</span>
                      </div>
                    </td>
                    <td>5%</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}
