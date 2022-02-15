import React from 'react';
import TournamentSmallCard from '../tournament-small-card';
import styles from './index.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
SwiperCore.use([Navigation]);
import 'swiper/css';
import "swiper/css/navigation";

interface ListTournamentsProps {
    title: string;
    id: string;
}

export default function ListTournaments(props: ListTournamentsProps) {
  return (
    <section className='de-list-tournaments de-pt-8 de-pb-3' id={props.id}>
      <div className='de-px-xl-8 de-px-4'>
        <h2 className='de-mb-5'>{props.title}</h2>
        <Swiper className={styles.de_slide}
          spaceBetween={24}
          slidesPerView={5}
          navigation={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
          <SwiperSlide>
            <TournamentSmallCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}
