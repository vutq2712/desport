import { useEffect, useState } from "react";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import { RegisterTourStatus } from "@app/types/tournament.type";
import { useRouter } from "next/router";
import { useSubscription } from "@app/hooks/subscription";
import { checkRegister } from "@app/api/tournament/overview/check-register";
import dayjs from "dayjs";
import { LivestreamCard } from "@app/dekits/components/livestream-card";
import { useTournamentContext } from "@app/modules/tournament/context/tournament-context";
import { TournamentTabKeys } from "@app/modules/tournament/services/sidebar";

export function TournamentOverview() {
  const [registerStatus, changeRegisterStatus] = useState<RegisterTourStatus>(RegisterTourStatus.UN_REGISTER)
  const tournamentCtx = useTournamentContext();
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    if (
      tournamentCtx.detail.operating?.start_time &&
      dayjs(dayjs()).isAfter(tournamentCtx.detail.operating.start_time) &&
      dayjs().isBefore(dayjs(tournamentCtx.detail.operating.end_time))
    ) {
      changeRegisterStatus(RegisterTourStatus.ONGOING);
    } else {
      const sub = checkRegister(router.query.tournamentId as string).subscribe({
        next: res => {
          if (res.data) {
            changeRegisterStatus(RegisterTourStatus.REGISTERED);
          }
        },
        error: error => alert(error?.response?.msg || 'Error'),
      })

      subscription.add(sub);
    }
  }, [])

  const gotoRegisterPage = () => {
    registerStatus === RegisterTourStatus.UN_REGISTER && router.push(`/tournament/${tournamentCtx?.detail?._id}?tab=${TournamentTabKeys.REGISTER}`);
  }

  return (
    <div className='tournament-overview'>
      <Accordion className='de-accordion' defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item className='de-card' eventKey='0'>
          <Accordion.Header className='de-card-header'>
            <div className='de-card-title'>Tournament Overview</div>
          </Accordion.Header>
          <Accordion.Body className='de-card-body'>
            <div className='tournament-overview-description'>
              {tournamentCtx?.detail?.info || 'TBA'}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Ongoing */}
        {tournamentCtx.hasLive && (
          <Accordion.Item className='de-card' eventKey='1'>
            <Accordion.Header as='div' className='de-card-header'>
              <div className='de-card-title'>Livestreams</div>
            </Accordion.Header>
            <Accordion.Body className='de-card-body'>
              <LivestreamCard />
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>

      <div className='text-center'>
        <button type='button' onClick={gotoRegisterPage} className='de-btn de-btn-primary' disabled={registerStatus !== RegisterTourStatus.UN_REGISTER} >
          {registerStatus === RegisterTourStatus.UN_REGISTER && <span>register now</span>}
          {registerStatus === RegisterTourStatus.REGISTERED && <span>registered</span>}
          {registerStatus === RegisterTourStatus.ONGOING && <span>View event</span>}
        </button>
      </div>
    </div>
  )
}
