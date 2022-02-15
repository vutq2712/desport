import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { PageWrapper } from '@app/dekits/layout';
import { myTournament as myTournamentApi, myTournamentData } from '@app/api/tournament/my-tournament';
import { CreateTournament } from './components/create-tournament';
import TournamentSmallCard from '../index/components/tournament-small-card';
import { Col, Row } from 'react-bootstrap';

export const MyTournament: NextPage = () => {
  const [myTournament, changeMyTournament] = useState<myTournamentData[]>([]);

  const metadata = {
    title: 'My tournament',
    description: 'My tournament',
    url: '/',
    canonical: '/',
    image: '/favicon.ico',
  };

  const getMyTournament = useCallback(() => {
    myTournamentApi(1, 50).subscribe(res => {
      if (res.data) {
        changeMyTournament(res.data);
      }
    })
  }, [])

  useEffect(() => {
    getMyTournament();
  }, [getMyTournament])

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-px-xl-8 de-px-4'>
        <div className='de-my-tournament-header'>
          <Row>
            <Col md='6' className='de-mb-2 de-mb-md-0'>
              <h2 className='de-my-tournament-heading'>{t('tournament.create.my_tournament')}</h2>
            </Col>
            <Col md='6' className='text-md-end'>
              <CreateTournament />
            </Col>
          </Row>
        </div>

        {myTournament && myTournament.length > 0 &&
          <Row>
            {myTournament.map(item => <Col xl='3' lg='4' md='6' key={item._id}>
              <TournamentSmallCard link={`/tournament-setting/${item._id}`} data={item} className='de-mb-8' />
            </Col>)}
          </Row>
        }
      </div>
    </PageWrapper>
  );
};
