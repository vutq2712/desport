import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MatchesCard } from '@app/dekits/components/matches-card';

export function UpcomingMatches(props) {
  return (
    <div className='de-card de-card-upcoming'>
      <div className='de-card-header'>
        <div className='de-card-title'>Upcoming matches</div>
        <a href='#' className='de-btn de-btn-sm de-btn-secondary'>View all</a>
      </div>
      <div className='de-card-body'>
        <Swiper className='de-matches-slide'
          spaceBetween={24}
          navigation={true}
          slidesPerView={'auto'}
        >
          <SwiperSlide>
            <MatchesCard single={props.single} />
          </SwiperSlide>
          <SwiperSlide>
            <MatchesCard single={props.single} />
          </SwiperSlide>
          <SwiperSlide>
            <MatchesCard single={props.single} />
          </SwiperSlide>
          <SwiperSlide>
            <MatchesCard single={props.single} />
          </SwiperSlide>
          <SwiperSlide>
            <MatchesCard single={props.single} />
          </SwiperSlide>
          <SwiperSlide>
            <MatchesCard single={props.single} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
