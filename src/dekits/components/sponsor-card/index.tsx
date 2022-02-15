export function SponsorCard(props: any) {
  return (
    <div className='de-sponsor-card' style={{ color: props.color }}>
      <div className='bg'></div>
      <div className='de-sponsor-card-inner'>
        <div className='de-sponsor-star'>
          {[...Array(props.star)].map((x, i) =>
            <svg key={i} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12.07 20.79C11.961 20.7898 11.8533 20.7655 11.7548 20.7188C11.6563 20.6721 11.5693 20.6042 11.5 20.52L1.50001 8.52001C1.37493 8.38354 1.30554 8.20514 1.30554 8.02001C1.30554 7.83489 1.37493 7.65649 1.50001 7.52001L5.40001 3.44001C5.47716 3.36018 5.57085 3.29822 5.67451 3.25848C5.77817 3.21875 5.88928 3.2022 6.00001 3.21001H18C18.1989 3.21019 18.3895 3.28932 18.53 3.43001L22.47 7.37001C22.6001 7.50127 22.6771 7.67591 22.6863 7.86045C22.6955 8.04499 22.6363 8.22644 22.52 8.37001L12.66 20.51C12.5902 20.5968 12.5019 20.667 12.4016 20.7154C12.3013 20.7639 12.1914 20.7893 12.08 20.79H12.07ZM3.07001 8.07001L12.07 18.86L20.92 8.00001L17.68 4.71001H6.27001L3.07001 8.07001Z' fill='currentColor' />
              <path d='M21.93 8.79004H2.07001C1.87109 8.79004 1.68033 8.71102 1.53968 8.57037C1.39902 8.42972 1.32001 8.23895 1.32001 8.04004C1.32001 7.84113 1.39902 7.65036 1.53968 7.50971C1.68033 7.36906 1.87109 7.29004 2.07001 7.29004H21.93C22.1289 7.29004 22.3197 7.36906 22.4603 7.50971C22.601 7.65036 22.68 7.84113 22.68 8.04004C22.68 8.23895 22.601 8.42972 22.4603 8.57037C22.3197 8.71102 22.1289 8.79004 21.93 8.79004Z' fill='currentColor' />
              <path d='M12.07 20.79C11.8711 20.79 11.6803 20.711 11.5397 20.5703C11.399 20.4297 11.32 20.2389 11.32 20.04V4C11.32 3.80109 11.399 3.61032 11.5397 3.46967C11.6803 3.32902 11.8711 3.25 12.07 3.25C12.2689 3.25 12.4597 3.32902 12.6003 3.46967C12.741 3.61032 12.82 3.80109 12.82 4V20C12.8269 20.1021 12.8126 20.2046 12.7779 20.3009C12.7432 20.3973 12.6889 20.4853 12.6184 20.5596C12.5479 20.6338 12.4628 20.6927 12.3684 20.7323C12.274 20.772 12.1724 20.7916 12.07 20.79Z' fill='currentColor' />
            </svg>
          )}
        </div>
        <div className='de-sponsor-name'>
          {props.name}
        </div>
      </div>
    </div>
  )
}
