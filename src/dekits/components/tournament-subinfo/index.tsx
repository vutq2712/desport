export function TournamentSubInfo({ info }) {
  return (
    <div className='de-tournament-subinfo'>
      <div className='de-tournament-sub-info de-tournament-time'>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M7.99992 14.7201C6.66763 14.7201 5.36528 14.3248 4.2577 13.5844C3.15012 12.8439 2.28711 11.7915 1.77787 10.5604C1.26863 9.32927 1.13607 7.97474 1.39696 6.66823C1.65785 5.36173 2.30047 4.16199 3.24347 3.22085C4.18648 2.27971 5.38749 1.63948 6.69451 1.38118C8.00152 1.12288 9.35579 1.25813 10.5859 1.7698C11.816 2.28148 12.8667 3.14658 13.605 4.25562C14.3432 5.36467 14.7359 6.6678 14.7333 8.00009C14.728 9.78302 14.0164 11.4912 12.7545 12.7507C11.4925 14.0102 9.78287 14.7183 7.99992 14.7201ZM7.99992 2.25342C6.86655 2.25342 5.7586 2.58934 4.81604 3.21874C3.87349 3.84814 3.13863 4.74278 2.7043 5.78963C2.26997 6.83649 2.15566 7.98859 2.3758 9.10038C2.59594 10.2122 3.14067 11.2338 3.94115 12.0361C4.74164 12.8385 5.76198 13.3856 6.87326 13.6083C7.98453 13.831 9.13689 13.7194 10.1848 13.2875C11.2326 12.8556 12.129 12.1228 12.7605 11.1817C13.3921 10.2406 13.7306 9.13346 13.7333 8.00009C13.7341 7.2463 13.5865 6.49972 13.2989 5.80298C13.0112 5.10623 12.5892 4.47297 12.0568 3.93934C11.5244 3.40571 10.8921 2.98217 10.196 2.6929C9.49995 2.40363 8.75371 2.2543 7.99992 2.25342Z' fill='#8B5CE4' />
          <path d='M9.87333 10.3532C9.80747 10.3547 9.74203 10.3425 9.68119 10.3172C9.62035 10.2919 9.56545 10.2543 9.52 10.2066L7.64667 8.33992C7.55287 8.24624 7.50012 8.11915 7.5 7.98658V4.24658C7.5 4.11397 7.55268 3.9868 7.64645 3.89303C7.74021 3.79926 7.86739 3.74658 8 3.74658C8.13261 3.74658 8.25978 3.79926 8.35355 3.89303C8.44732 3.9868 8.5 4.11397 8.5 4.24658V7.77992L10.2267 9.49992C10.3203 9.59367 10.3729 9.72075 10.3729 9.85325C10.3729 9.98575 10.3203 10.1128 10.2267 10.2066C10.1805 10.2533 10.1255 10.2904 10.0648 10.3156C10.0041 10.3407 9.93903 10.3536 9.87333 10.3532Z' fill='#8B5CE4' />
        </svg>
        <span>{info.timer}</span>
      </div>
      {/* TODO location off line event */}
      {/* <div className='de-tournament-sub-info de-tournament-location'>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M7.88004 7.88654C7.41723 7.88654 6.96482 7.74931 6.58001 7.49218C6.1952 7.23506 5.89527 6.8696 5.71816 6.44202C5.54105 6.01444 5.49471 5.54395 5.585 5.09003C5.67529 4.63612 5.89816 4.21917 6.22541 3.89191C6.55267 3.56466 6.96961 3.3418 7.42353 3.25151C7.87744 3.16122 8.34794 3.20756 8.77552 3.38467C9.2031 3.56177 9.56856 3.8617 9.82568 4.24651C10.0828 4.63132 10.22 5.08374 10.22 5.54654C10.2183 6.16661 9.97118 6.76078 9.53273 7.19923C9.09427 7.63769 8.50011 7.88479 7.88004 7.88654ZM7.88004 4.20654C7.61633 4.20654 7.35855 4.28474 7.13928 4.43125C6.92001 4.57776 6.74912 4.786 6.6482 5.02963C6.54728 5.27327 6.52088 5.54136 6.57233 5.8C6.62377 6.05864 6.75076 6.29622 6.93723 6.48269C7.1237 6.66916 7.36128 6.79614 7.61992 6.84759C7.87856 6.89904 8.14665 6.87263 8.39029 6.77172C8.63392 6.6708 8.84216 6.4999 8.98867 6.28064C9.13518 6.06137 9.21337 5.80359 9.21337 5.53988C9.21337 5.18626 9.0729 4.84712 8.82285 4.59707C8.5728 4.34702 8.23366 4.20654 7.88004 4.20654Z' fill='#8B5CE4' />
          <path d='M11.6402 6.79324H11.5669C11.5018 6.7843 11.4391 6.76245 11.3826 6.72896C11.3261 6.69548 11.2768 6.65104 11.2377 6.59826C11.1985 6.54547 11.1704 6.4854 11.1548 6.42158C11.1392 6.35775 11.1365 6.29146 11.1469 6.22658V6.12658V5.96658C11.1527 5.90672 11.1527 5.84644 11.1469 5.78658C11.1469 5.60658 11.1469 5.51324 11.1469 5.51324C11.1051 4.68549 10.7458 3.90572 10.1437 3.33617C9.5416 2.76663 8.74306 2.45118 7.91427 2.45548C7.08548 2.45977 6.29026 2.78347 5.69409 3.35923C5.09792 3.93498 4.7467 4.71844 4.71354 5.54658C4.71354 5.54658 4.71354 5.63324 4.71354 5.75991C4.70833 5.8198 4.70833 5.88002 4.71354 5.93991C4.71354 6.01324 4.71354 6.06658 4.71354 6.12658V6.22658C4.72625 6.35383 4.68972 6.48111 4.61146 6.58226C4.5332 6.6834 4.41916 6.75071 4.29279 6.77035C4.16643 6.78999 4.03734 6.76046 3.93207 6.68784C3.82681 6.61521 3.75338 6.50502 3.72687 6.37991V6.13991C3.71474 6.02244 3.71474 5.90404 3.72687 5.78658V5.59324C3.72424 5.03994 3.83062 4.49154 4.03994 3.97935C4.24925 3.46716 4.5574 3.00121 4.94678 2.60811C5.33617 2.21501 5.79917 1.90245 6.30935 1.68829C6.81953 1.47412 7.3669 1.36254 7.9202 1.35991C8.47351 1.35728 9.02191 1.46366 9.5341 1.67298C10.0463 1.88229 10.5122 2.19044 10.9053 2.57983C11.2984 2.96921 11.611 3.43221 11.8252 3.94239C12.0393 4.45257 12.1509 4.99994 12.1535 5.55324C12.1535 5.60658 12.1535 5.67991 12.1535 5.80658C12.1531 5.92766 12.1397 6.04834 12.1135 6.16658V6.37991C12.0938 6.49255 12.036 6.59501 11.9499 6.67023C11.8638 6.74544 11.7545 6.78886 11.6402 6.79324Z' fill='#8B5CE4' />
          <path d='M8.00015 14.6668C7.93446 14.6671 7.86936 14.6543 7.80869 14.6291C7.74801 14.6039 7.69298 14.5669 7.64682 14.5201C4.06682 10.9401 3.80015 5.7868 3.78682 5.5668C3.78316 5.43463 3.83131 5.30627 3.92099 5.20911C4.01067 5.11196 4.13478 5.05371 4.26682 5.0468C4.33249 5.04412 4.39805 5.05442 4.45974 5.0771C4.52143 5.09978 4.57804 5.1344 4.62634 5.17898C4.67464 5.22357 4.71367 5.27723 4.74121 5.33692C4.76874 5.3966 4.78424 5.46112 4.78682 5.5268C4.78682 5.57347 5.05348 10.5135 8.35348 13.8135C8.44712 13.9072 8.49971 14.0343 8.49971 14.1668C8.49971 14.2993 8.44712 14.4264 8.35348 14.5201C8.30732 14.5669 8.25229 14.6039 8.19161 14.6291C8.13094 14.6543 8.06584 14.6671 8.00015 14.6668Z' fill='#8B5CE4' />
          <path d='M8.00005 14.6668C7.93435 14.6671 7.86926 14.6543 7.80859 14.6291C7.74791 14.6039 7.69288 14.5669 7.64672 14.5201C7.55308 14.4264 7.50049 14.2993 7.50049 14.1668C7.50049 14.0343 7.55308 13.9072 7.64672 13.8135C10.98 10.4801 11.2067 5.57347 11.2134 5.5268C11.216 5.46112 11.2315 5.3966 11.259 5.33692C11.2865 5.27723 11.3256 5.22357 11.3739 5.17898C11.4222 5.1344 11.4788 5.09978 11.5405 5.0771C11.6022 5.05442 11.6677 5.04412 11.7334 5.0468C11.8654 5.05371 11.9895 5.11196 12.0792 5.20911C12.1689 5.30627 12.217 5.43463 12.2134 5.5668C12.2134 5.7868 11.9334 10.9401 8.35338 14.5201C8.30722 14.5669 8.25219 14.6039 8.19151 14.6291C8.13084 14.6543 8.06574 14.6671 8.00005 14.6668Z' fill='#8B5CE4' />
        </svg>
        <span>{info.location}</span>
      </div> */}
      {/* Media link org */}
      <div className='de-tournament-sub-info de-tournament-link'>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M5.17356 14C4.54564 14.0017 3.9314 13.8166 3.4089 13.4683C2.8864 13.1201 2.47924 12.6243 2.23915 12.0441C1.99906 11.4639 1.93689 10.8254 2.06054 10.2098C2.18418 9.59415 2.48806 9.02918 2.93356 8.58666L3.87356 7.64666C3.96731 7.55303 4.0944 7.50044 4.2269 7.50044C4.3594 7.50044 4.48648 7.55303 4.58023 7.64666C4.6274 7.69263 4.66489 7.74757 4.69049 7.80826C4.71609 7.86894 4.72928 7.93414 4.72928 8C4.72928 8.06586 4.71609 8.13105 4.69049 8.19174C4.66489 8.25242 4.6274 8.30737 4.58023 8.35333L3.64023 9.29333C3.23475 9.70063 3.00711 10.2519 3.00711 10.8267C3.00711 11.4014 3.23475 11.9527 3.64023 12.36C4.05325 12.7545 4.60242 12.9746 5.17356 12.9746C5.74471 12.9746 6.29388 12.7545 6.7069 12.36L8.5869 10.4733C8.78827 10.2727 8.94804 10.0342 9.05706 9.77166C9.16608 9.50911 9.2222 9.22762 9.2222 8.94333C9.2222 8.65904 9.16608 8.37755 9.05706 8.115C8.94804 7.85245 8.78827 7.614 8.5869 7.41333C8.49326 7.31958 8.44067 7.1925 8.44067 7.06C8.44067 6.9275 8.49326 6.80041 8.5869 6.70666C8.63286 6.65949 8.68781 6.622 8.74849 6.5964C8.80917 6.57081 8.87437 6.55762 8.94023 6.55762C9.00609 6.55762 9.07129 6.57081 9.13197 6.5964C9.19266 6.622 9.2476 6.65949 9.29356 6.70666C9.58846 6.99973 9.82249 7.34822 9.98219 7.73207C10.1419 8.11593 10.2241 8.52758 10.2241 8.94333C10.2241 9.35908 10.1419 9.77073 9.98219 10.1546C9.82249 10.5384 9.58846 10.8869 9.29356 11.18L7.41356 13.0667C7.12078 13.3631 6.77194 13.5982 6.38737 13.7585C6.0028 13.9187 5.59018 14.0008 5.17356 14Z' fill='#8B5CE4' />
          <path d='M7.06011 9.43988C6.99425 9.44136 6.9288 9.42908 6.86796 9.40383C6.80712 9.37857 6.75222 9.3409 6.70677 9.29321C6.41108 9.0006 6.17634 8.65226 6.01613 8.26834C5.85593 7.88442 5.77344 7.47255 5.77344 7.05654C5.77344 6.64054 5.85593 6.22867 6.01613 5.84475C6.17634 5.46083 6.41108 5.11249 6.70677 4.81988L8.58677 2.93321C9.18086 2.33912 9.98661 2.00537 10.8268 2.00537C11.6669 2.00537 12.4727 2.33912 13.0668 2.93321C13.6609 3.52729 13.9946 4.33305 13.9946 5.17321C13.9946 6.01337 13.6609 6.81912 13.0668 7.41321L12.1268 8.35321C12.033 8.44684 11.9059 8.49944 11.7734 8.49944C11.6409 8.49944 11.5139 8.44684 11.4201 8.35321C11.3729 8.30725 11.3354 8.2523 11.3098 8.19162C11.2842 8.13093 11.2711 8.06574 11.2711 7.99988C11.2711 7.93401 11.2842 7.86882 11.3098 7.80814C11.3354 7.74745 11.3729 7.69251 11.4201 7.64654L12.3601 6.70654C12.7656 6.29925 12.9932 5.74793 12.9932 5.17321C12.9932 4.59849 12.7656 4.04717 12.3601 3.63988C11.9471 3.24539 11.3979 3.02527 10.8268 3.02527C10.2556 3.02527 9.70646 3.24539 9.29344 3.63988L7.41344 5.52654C7.21046 5.72631 7.04926 5.96446 6.93922 6.22713C6.82919 6.48981 6.77252 6.77175 6.77252 7.05654C6.77252 7.34133 6.82919 7.62328 6.93922 7.88595C7.04926 8.14863 7.21046 8.38678 7.41344 8.58654C7.50707 8.68029 7.55967 8.80738 7.55967 8.93988C7.55967 9.07238 7.50707 9.19946 7.41344 9.29321C7.36728 9.33995 7.31224 9.377 7.25157 9.40219C7.19089 9.42737 7.1258 9.44019 7.06011 9.43988Z' fill='#8B5CE4' />
        </svg>
        <a href={info.mediaLink} target='_blank' rel='noreferrer'>Media link</a>
      </div>
    </div>
  )
}