import React from 'react';
import TournamentFeatureCard from '../tournament-feature-card';
import TournamentMediumCard from '../tournament-medium-card';
import styles from './index.module.scss';

export default function PremiumTournaments() {
  return (
    <section className={`${styles.de_premium_tournaments} de-pt-8 de-pb-3`} id='Premium'>
      <div className='de-px-xl-8 de-px-4'>
        <h2 className='de-mb-5'>Premium Tournaments</h2>
        <div className='row de-gx-3'>
          <div className='col-xl-5 col-lg-6'>
            <TournamentFeatureCard/>
          </div>
          <div className='col-xl-5 col-lg-6'>
            <TournamentMediumCard />
            <TournamentMediumCard />
            <TournamentMediumCard />
          </div>
        </div>
      </div>
    </section>
  )
}
