import React from 'react';
import BannerImage from 'styles/uikit/media/images/auth-bg.png';
import styles from './index.module.scss';

export default function Banner() {
  return (
    <section className={styles.de_banner} style={{ backgroundImage: `url(${BannerImage.src})` }}>
      <div className={styles.de_banner_inner}>
        <div className={styles.de_banner_body}>
          <h1>Renegades <span>vs</span> Chiefs</h1>
          <h4>ESL Pro League Season 16 - Playoffs</h4>
          <div className={styles.de_banner_meta}>
            <div className={styles.de_game_info}>
              <img src='/assets/images/lol.png' alt='lol' />
              <span>League of Legends®</span>
            </div>
            <div className={styles.de_game_language}>
              <img src='/assets/images/flags/en.png' alt='en' />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
