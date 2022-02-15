import { SponsorData } from "@app/api/tournament/sponsor/get-sponsors";
import { SponsorSmallCard } from "@app/dekits/components/sponsor-small-card";
import { OperatingStatus } from "@app/types/tournament.type";
import Link from "next/link";

interface Info {
  id?: string;
  tournamentName: string;
  avatar: string;
}

interface TournamentBannerProps {
  info: Info;
  sponsors?: SponsorData[];
  [key: string]: any;
}

export function TournamentBannerSimple({
  info,
  sponsors = [],
}: TournamentBannerProps) {
  return (
    <div className='de-team-banner-simple' style={{ backgroundImage: 'url("/assets/images/tournament-banner.png")' }}>
      <div className='team-banner-inner'>
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
                  {sponsors.map((sponsor, i) => (
                    <SponsorSmallCard key={sponsor._id} name={sponsor.display_name} color={i ? '#FFFFFF' : '#E59C50'} />
                  ))}
                </div> : <></>
              }
            </div>
          </div>
        </div>
        <div className='team-banner-logo'>
          <img src={info.avatar} alt='' />
        </div>
      </div>
    </div>
  )
}
