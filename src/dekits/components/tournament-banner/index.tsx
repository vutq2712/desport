import { SponsorData } from "@app/api/tournament/sponsor/get-sponsors";
import { SponsorSmallCard } from "@app/dekits/components/sponsor-small-card";
import { TournamentSubInfo } from "@app/dekits/components/tournament-subinfo";
import { formatNumber } from "@app/dekits/utils/number-format";
import { TournamentTabKeys } from "@app/modules/tournament/services/sidebar";
import { OperatingStatus } from "@app/types/tournament.type";
import Link from "next/link";
import { LivestreamTag } from "../livestream-tag";

interface Info {
  id?: string;
  tournamentName: string;
  gameName: string;
  organizerName: string;
  timer: string;
  location: string;
  mediaLink: string;
  prizePool: {
    total: number;
    unit: string;
  }
  status: OperatingStatus;
  hasLive?: boolean;
}

interface TournamentBannerProps {
  showContribute?: boolean;
  info: Info;
  sponsors?: SponsorData[];
  [key: string]: any;
}

const mapColor = ['#E59C50', '#FFFFFF'];

const mapOperatingStatus = {
  [OperatingStatus.UPCOMING]: {
    label: 'Upcoming',
    className: 'warning'
  },
  [OperatingStatus.ONGOING]: {
    label: 'On-going',
    className: 'success'
  },
  [OperatingStatus.FINISHED]: {
    label: 'Finished',
    className: 'primary'
  },
}

export function TournamentBanner({
  info,
  showContribute = false,
  sponsors = [],
}: TournamentBannerProps) {
  return (
    <section className='de-tournament-banner'>
      <div className='de-tournament-inner'>
        <div className='de-tournament-header'>
          <div className='de-px-xl-8 de-px-4'>
            <div className='row align-items-center'>
              <div className='col-md-6'>
                <Link href='/'>
                  <a className='de-btn de-tournament-back'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z' fill='currentColor' />
                    </svg>
                    <span>back to my tournament</span>
                  </a>
                </Link>
              </div>
              <div className='col-md-6 text-md-end'>
                {
                  sponsors && sponsors.length > 0 ? <div className='de-sponsor-sm-wrap'>
                    <span>Sponsored by</span>
                    {sponsors.map((sponsor, index) => (
                      <SponsorSmallCard key={sponsor._id} name={sponsor.display_name} color={mapColor[index] || mapColor[0]} />
                    ))}
                  </div> : <></>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='de-tournament-body'>
          <div className='row align-items-end'>
            <div className='col-lg-9'>
              <div className='de-tournament-tags'>
                <span className={`de-tag ${mapOperatingStatus[info.status].className}`}>{mapOperatingStatus[info.status].label}</span>
                {info.hasLive && <LivestreamTag className='de-ms-1' />}
              </div>
              {/* Unused */}
              {/* <h4>{info.gameName} by {info.organizerName}:</h4> */}
              <h1>{info.tournamentName}</h1>
              <div className='de-tournament-meta'>
                <div className='de-tournament-game'>
                  <img src='/assets/images/lol.png' alt='lol' />
                  <span>{info.gameName}</span>
                </div>
                <div className='de-sub-info lg'>
                  <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8.09147 9.6C7.46591 9.60132 6.85404 9.41694 6.33336 9.07022C5.81268 8.7235 5.40662 8.23005 5.16662 7.65236C4.92662 7.07467 4.86348 6.43875 4.9852 5.82515C5.10692 5.21155 5.40801 4.64788 5.85035 4.20555C6.29268 3.76321 6.85635 3.46212 7.46995 3.3404C8.08355 3.21868 8.71947 3.28182 9.29716 3.52182C9.87485 3.76182 10.3683 4.16788 10.715 4.68856C11.0617 5.20924 11.2461 5.82111 11.2448 6.44667C11.2448 7.28298 10.9126 8.08504 10.3212 8.67641C9.72984 9.26777 8.92778 9.6 8.09147 9.6ZM8.09147 4.26667C7.66398 4.26535 7.24571 4.39091 6.88962 4.62745C6.53354 4.86399 6.25565 5.20087 6.09114 5.59544C5.92663 5.99001 5.8829 6.42452 5.96549 6.84396C6.04808 7.2634 6.25327 7.64889 6.55509 7.95164C6.8569 8.25439 7.24177 8.46077 7.66095 8.54466C8.08013 8.62855 8.51477 8.58616 8.90985 8.42287C9.30492 8.25959 9.64266 7.98274 9.8803 7.62739C10.1179 7.27203 10.2448 6.85416 10.2448 6.42667C10.2395 5.85842 10.0106 5.31514 9.60749 4.91457C9.20442 4.51399 8.65973 4.2884 8.09147 4.28667V4.26667Z' fill='#8B5CE4' />
                    <path d='M12.7574 12.8533C12.6454 12.853 12.5368 12.8145 12.4496 12.7442C12.3624 12.6739 12.3016 12.576 12.2774 12.4667C12.0785 11.6482 11.61 10.9205 10.9473 10.4005C10.2847 9.88056 9.46639 9.5986 8.62409 9.6H7.55743C6.71628 9.6001 5.89954 9.88274 5.23826 10.4026C4.57697 10.9224 4.10947 11.6493 3.91076 12.4667C3.895 12.5306 3.86681 12.5908 3.82779 12.6438C3.78878 12.6968 3.7397 12.7416 3.68337 12.7756C3.62703 12.8097 3.56454 12.8323 3.49947 12.8422C3.43439 12.8521 3.368 12.8491 3.30409 12.8333C3.24018 12.8176 3.18 12.7894 3.12699 12.7504C3.07398 12.7113 3.02916 12.6623 2.99512 12.6059C2.96107 12.5496 2.93845 12.4871 2.92855 12.422C2.91865 12.357 2.92167 12.2906 2.93743 12.2267C3.18987 11.192 3.7825 10.272 4.62026 9.61439C5.45802 8.95675 6.49238 8.59952 7.55743 8.6H8.61743C9.68398 8.59753 10.7202 8.95483 11.5586 9.61414C12.3969 10.2735 12.9884 11.1963 13.2374 12.2333C13.2678 12.3623 13.2464 12.4981 13.1779 12.6115C13.1093 12.7249 12.9991 12.8069 12.8708 12.84L12.7574 12.8533Z' fill='#8B5CE4' />
                    <path d='M8.09111 14.8733C6.73169 14.8733 5.4028 14.4702 4.27249 13.715C3.14218 12.9597 2.2612 11.8862 1.74098 10.6303C1.22075 9.37437 1.08464 7.99237 1.34985 6.65908C1.61505 5.32578 2.26968 4.10107 3.23093 3.13982C4.19218 2.17857 5.41689 1.52394 6.75019 1.25874C8.08349 0.993526 9.46548 1.12964 10.7214 1.64987C11.9774 2.17009 13.0508 3.05107 13.8061 4.18138C14.5613 5.31169 14.9644 6.64058 14.9644 8C14.9627 9.82238 14.238 11.5696 12.9493 12.8582C11.6607 14.1468 9.91349 14.8716 8.09111 14.8733ZM8.09111 2.12667C6.92947 2.12667 5.79393 2.47113 4.82806 3.1165C3.8622 3.76187 3.1094 4.67916 2.66486 5.75237C2.22032 6.82558 2.10401 8.00652 2.33063 9.14583C2.55726 10.2851 3.11664 11.3317 3.93804 12.1531C4.75944 12.9745 5.80596 13.5339 6.94528 13.7605C8.08459 13.9871 9.26553 13.8708 10.3387 13.4263C11.4119 12.9817 12.3292 12.2289 12.9746 11.263C13.62 10.2972 13.9644 9.16164 13.9644 8C13.9627 6.44284 13.3433 4.94996 12.2422 3.84887C11.1412 2.74779 9.64827 2.12843 8.09111 2.12667Z' fill='#8B5CE4' />
                  </svg>
                  <span>Hosted by {info.organizerName}</span>
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='de-sub-info-2'>
                  <img src='/assets/images/busd-icon.svg' alt='busd' />
                  <b>{info.prizePool.total ? formatNumber(info.prizePool.total) : ''}</b>
                  <span>{info.prizePool.unit}</span>
                </div>
                {
                  showContribute ?  <Link href={`/tournament/${info.id}?tab=${TournamentTabKeys.CONTRIBUTE}`}>
                    <a type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>
                      <span>Contribute</span>
                    </a>
                  </Link>:
                    <></>
                }
              </div>
            </div>
            <div className='col-lg-3'>
              <TournamentSubInfo info={info} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
