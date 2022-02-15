import { GameSmallCard } from "../game-small-card";

export function TeamMediumCard() {
  return (
    <div className='de-team-md-card w-100'>
      <div className='team-md-logo'>
        <img src='/assets/images/team-logo.png' alt='Virtus Pro' />
      </div>
      <div className='team-md-info'>
        <div className='team-info-header'>
          <div className='team-name'>Virtus Pro</div>
          <div className='team-action'>
            <a href='#' className='de-btn de-btn-sm de-btn-outline-secondary de-me-1'>View</a>
            <a href='#' className='de-btn de-btn-sm de-btn-outline-secondary'>Manage</a>
          </div>
        </div>
        <div className='team-game-info'>
          <GameSmallCard logo='/assets/images/csgo.png' name='CSGO' />
        </div>
        <div className='de-stats-card'>
          <div className='de-stats-item'>
            <div className='de-stats-label'>
              <svg width='16' height='16' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8 15.3491C7.86793 15.3473 7.74175 15.2941 7.64836 15.2007C7.55496 15.1073 7.50173 14.9811 7.5 14.8491V11.1357C7.5 11.0031 7.55268 10.876 7.64645 10.7822C7.74022 10.6884 7.86739 10.6357 8 10.6357C8.13261 10.6357 8.25978 10.6884 8.35355 10.7822C8.44732 10.876 8.5 11.0031 8.5 11.1357V14.8491C8.49827 14.9811 8.44504 15.1073 8.35164 15.2007C8.25825 15.2941 8.13207 15.3473 8 15.3491Z' fill='white' />
                <path d='M8.00008 11.6357C6.98165 11.6357 6.00493 11.2311 5.28479 10.511C4.56465 9.79085 4.16008 8.81413 4.16008 7.7957V3.34237C4.14993 3.1981 4.14993 3.0533 4.16008 2.90903C4.1684 2.84381 4.18948 2.78087 4.22212 2.72379C4.25477 2.66671 4.29833 2.61663 4.35033 2.57639C4.40233 2.53615 4.46175 2.50655 4.52519 2.48927C4.58863 2.472 4.65486 2.46738 4.72008 2.4757C4.7853 2.48402 4.84825 2.5051 4.90532 2.53774C4.9624 2.57039 5.01249 2.61395 5.05273 2.66596C5.09296 2.71796 5.12257 2.77737 5.13984 2.84081C5.15712 2.90426 5.16173 2.97048 5.15341 3.0357C5.14634 3.1378 5.14634 3.24027 5.15341 3.34237V7.7957C5.15341 8.54892 5.45263 9.27128 5.98523 9.80388C6.51783 10.3365 7.2402 10.6357 7.99341 10.6357C8.74663 10.6357 9.46899 10.3365 10.0016 9.80388C10.5342 9.27128 10.8334 8.54892 10.8334 7.7957V3.34237C10.8405 3.24027 10.8405 3.1378 10.8334 3.0357C10.8365 2.91643 10.8821 2.80218 10.962 2.71359C11.0419 2.62499 11.1508 2.56789 11.2692 2.5526C11.3875 2.53731 11.5074 2.56483 11.6072 2.63019C11.707 2.69556 11.7801 2.79446 11.8134 2.90903C11.8236 3.0533 11.8236 3.1981 11.8134 3.34237V7.7957C11.8134 8.80953 11.4125 9.78223 10.6981 10.5016C9.98377 11.221 9.01388 11.6287 8.00008 11.6357Z' fill='white' />
                <path d='M11.7 7.57573C11.6084 7.57494 11.5186 7.54962 11.44 7.5024L11.08 7.28907C10.9723 7.22029 10.895 7.11289 10.864 6.9889C10.833 6.86492 10.8507 6.73377 10.9134 6.6224C10.9799 6.51226 11.0869 6.4325 11.2114 6.40012C11.336 6.36773 11.4682 6.3853 11.58 6.44907L11.8134 6.58907C13.5934 6.45573 14 4.42907 14.1334 3.46907H1.86669C1.96002 4.43573 2.38669 6.45573 4.16669 6.54907L4.40002 6.40907C4.5118 6.3453 4.64407 6.32773 4.76862 6.36012C4.89316 6.3925 5.00012 6.47227 5.06669 6.5824C5.12937 6.69377 5.14703 6.82492 5.11603 6.9489C5.08503 7.07289 5.00774 7.18029 4.90002 7.24907L4.54002 7.4624C4.46146 7.50962 4.37168 7.53494 4.28002 7.53573C1.54002 7.53573 0.813354 4.53573 0.813354 2.94907C0.820263 2.81703 0.878512 2.69292 0.975667 2.60324C1.07282 2.51356 1.20119 2.46541 1.33335 2.46907H14.6667C14.7988 2.47079 14.9249 2.52403 15.0183 2.61742C15.1117 2.71082 15.165 2.837 15.1667 2.96907C15.1667 4.55573 14.44 7.57573 11.7 7.57573Z' fill='white' />
                <path d='M11.7133 15.3491H5.04663C4.91402 15.3491 4.78685 15.2964 4.69308 15.2027C4.59931 15.1089 4.54663 14.9817 4.54663 14.8491C4.54663 14.7165 4.59931 14.5893 4.69308 14.4956C4.78685 14.4018 4.91402 14.3491 5.04663 14.3491H11.7133C11.8459 14.3491 11.9731 14.4018 12.0669 14.4956C12.1606 14.5893 12.2133 14.7165 12.2133 14.8491C12.2133 14.9817 12.1606 15.1089 12.0669 15.2027C11.9731 15.2964 11.8459 15.3491 11.7133 15.3491Z' fill='white' />
              </svg>
              <span>Tournaments</span>
            </div>
            <div className='de-stats-value'>100</div>
          </div>
          <div className='de-stats-item'>
            <div className='de-stats-label'>
              <svg width='16' height='16' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M7.69997 13.2158C7.5677 13.2142 7.44112 13.1617 7.34664 13.0691L3.54664 9.26245C3.46325 9.17147 3.41699 9.05253 3.41699 8.92912C3.41699 8.8057 3.46325 8.68677 3.54664 8.59578L9.13997 2.90912C9.23365 2.81532 9.36074 2.76257 9.49331 2.76245H13.3266C13.4575 2.76245 13.583 2.81443 13.6755 2.90695C13.768 2.99946 13.82 3.12494 13.82 3.25578L13.8666 7.04245C13.8668 7.17704 13.8142 7.30632 13.72 7.40245L8.04664 13.0758C7.9521 13.1633 7.82876 13.2131 7.69997 13.2158ZM4.59997 8.90912L7.69997 12.0025L12.8666 6.83578L12.8333 3.75578H9.70664L4.59997 8.90912Z' fill='white' />
                <path d='M9.56664 15.0758C9.50078 15.0773 9.43534 15.0651 9.37449 15.0398C9.31365 15.0145 9.25875 14.9769 9.2133 14.9292L1.67997 7.40251C1.59165 7.30772 1.54357 7.18236 1.54585 7.05283C1.54814 6.92329 1.60061 6.7997 1.69222 6.70809C1.78383 6.61648 1.90742 6.56401 2.03696 6.56172C2.16649 6.55944 2.29185 6.60752 2.38664 6.69584L9.91997 14.2425C10.0136 14.3363 10.0662 14.4633 10.0662 14.5958C10.0662 14.7283 10.0136 14.8554 9.91997 14.9492C9.82348 15.0363 9.69651 15.0818 9.56664 15.0758Z' fill='white' />
                <path d='M4.33328 15.0358C4.21082 15.0336 4.09294 14.9888 3.99994 14.9091L1.69994 12.6091C1.6525 12.5607 1.61511 12.5034 1.58994 12.4404C1.56476 12.3775 1.5523 12.3102 1.55328 12.2424C1.55328 11.9691 1.55328 11.9624 4.29994 9.29576C4.39369 9.20213 4.52078 9.14954 4.65328 9.14954C4.78578 9.14954 4.91286 9.20213 5.00661 9.29576C5.10024 9.38951 5.15284 9.5166 5.15284 9.6491C5.15284 9.7816 5.10024 9.90868 5.00661 10.0024C4.14661 10.8491 3.21328 11.7691 2.74661 12.2424L4.33328 13.8291L6.57328 11.5758C6.61924 11.5286 6.67418 11.4911 6.73487 11.4655C6.79555 11.4399 6.86075 11.4267 6.92661 11.4267C6.99247 11.4267 7.05767 11.4399 7.11835 11.4655C7.17903 11.4911 7.23398 11.5286 7.27994 11.5758C7.37358 11.6695 7.42617 11.7966 7.42617 11.9291C7.42617 12.0616 7.37358 12.1887 7.27994 12.2824L4.66661 14.9091C4.5742 14.9898 4.45595 15.0347 4.33328 15.0358Z' fill='white' />
              </svg>
              <span>Match played</span>
            </div>
            <div className='de-stats-value'>100</div>
          </div>
          <div className='de-stats-item'>
            <div className='de-stats-label'>
              <svg width='16' height='16' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12.3533 13.7357H3.6C3.49522 13.7367 3.39287 13.7042 3.30776 13.6431C3.22266 13.582 3.15923 13.4953 3.12667 13.3957L1 6.90906C0.967419 6.81578 0.964 6.7148 0.990198 6.61953C1.0164 6.52426 1.07097 6.43923 1.14667 6.37573C1.22143 6.31013 1.31427 6.26867 1.41302 6.25677C1.51176 6.24487 1.6118 6.2631 1.7 6.30906L5.58 8.24239L7.58 4.36239C7.62611 4.28504 7.69151 4.22099 7.76981 4.17651C7.84811 4.13203 7.93662 4.10864 8.02667 4.10864C8.11672 4.10864 8.20523 4.13203 8.28352 4.17651C8.36182 4.22099 8.42723 4.28504 8.47333 4.36239L10.4733 8.24906L14.36 6.31573C14.4472 6.27033 14.5461 6.2524 14.6437 6.2643C14.7413 6.2762 14.8329 6.31737 14.9067 6.38239C14.9705 6.45233 15.0132 6.53896 15.0297 6.6322C15.0462 6.72543 15.0359 6.82144 15 6.90906L12.8267 13.3891C12.7953 13.4899 12.7323 13.578 12.6471 13.6404C12.5619 13.7028 12.4589 13.7362 12.3533 13.7357ZM4 12.7357H12L13.6733 7.74239L10.4267 9.35573C10.3685 9.38547 10.3051 9.40338 10.24 9.40841C10.1748 9.41343 10.1094 9.40549 10.0474 9.38502C9.98535 9.36456 9.92802 9.33198 9.87869 9.28919C9.82936 9.24639 9.78902 9.19423 9.76 9.13573L8 5.68239L6.24667 9.13573C6.21765 9.19423 6.17731 9.24639 6.12798 9.28919C6.07865 9.33198 6.02132 9.36456 5.9593 9.38502C5.89729 9.40549 5.83183 9.41343 5.76671 9.40841C5.7016 9.40338 5.63814 9.38547 5.58 9.35573L2.32 7.72239L4 12.7357Z' fill='white' />
                <path d='M8.00005 10.7224C7.86797 10.7207 7.7418 10.6675 7.6484 10.5741C7.555 10.4807 7.50177 10.3545 7.50005 10.2224C7.49916 10.1571 7.51127 10.0922 7.53567 10.0316C7.56006 9.97095 7.59626 9.91577 7.64216 9.86926C7.68806 9.82274 7.74274 9.7858 7.80304 9.76059C7.86333 9.73538 7.92803 9.72241 7.99338 9.72241C8.12599 9.72241 8.25316 9.77509 8.34693 9.86886C8.4407 9.96263 8.49338 10.0898 8.49338 10.2224C8.49338 10.355 8.4407 10.4822 8.34693 10.576C8.25316 10.6697 8.12599 10.7224 7.99338 10.7224H8.00005Z' fill='white' />
              </svg>
              <span>Wins</span>
            </div>
            <div className='de-stats-value'>100</div>
          </div>
          <div className='de-stats-item'>
            <div className='de-stats-label'>
              <svg width='16' height='16' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M7.99996 15.3757C7.91839 15.3756 7.83815 15.355 7.76663 15.3157C7.55996 15.2024 2.61996 12.5824 1.58663 9.04908C0.993297 7.04908 1.1933 5.09575 2.11996 3.85575C2.45865 3.40824 2.90036 3.04909 3.40757 2.80884C3.91477 2.56859 4.47248 2.45432 5.0333 2.47575C5.63531 2.44626 6.23337 2.58775 6.75835 2.88386C7.28333 3.17998 7.71379 3.61862 7.99996 4.14908C8.28614 3.61862 8.71659 3.17998 9.24157 2.88386C9.76655 2.58775 10.3646 2.44626 10.9666 2.47575C11.5274 2.45432 12.0852 2.56859 12.5924 2.80884C13.0996 3.04909 13.5413 3.40824 13.88 3.85575C14.8066 5.09575 15.0066 7.03575 14.4133 9.04908C13.38 12.5824 8.4133 15.2024 8.2333 15.3157C8.16178 15.355 8.08154 15.3756 7.99996 15.3757ZM5.0333 3.47575C4.62787 3.45471 4.22344 3.53298 3.85514 3.70377C3.48685 3.87456 3.16582 4.13269 2.91996 4.45575C2.18663 5.44241 2.03996 7.05575 2.54663 8.76908C3.34663 11.4957 7.0333 13.7491 7.99996 14.3024C8.96663 13.7491 12.6666 11.4891 13.4533 8.76908C13.96 7.05575 13.8133 5.43575 13.08 4.45575C12.8341 4.13269 12.5131 3.87456 12.1448 3.70377C11.7765 3.53298 11.3721 3.45471 10.9666 3.47575C8.68663 3.47575 8.5133 5.68242 8.49996 5.92908C8.4932 6.05764 8.43775 6.1788 8.34488 6.26795C8.25201 6.35711 8.12869 6.40757 7.99996 6.40908C7.87124 6.40757 7.74791 6.35711 7.65505 6.26795C7.56218 6.1788 7.50673 6.05764 7.49996 5.92908C7.48663 5.68242 7.3333 3.47575 5.0333 3.47575Z' fill='white' />
                <path d='M7.99994 11.329C7.86786 11.3273 7.74169 11.2741 7.64829 11.1807C7.5549 11.0873 7.50166 10.9611 7.49994 10.829V9.23569L5.11327 8.06903C5.03302 8.02998 4.96469 7.97017 4.91536 7.8958C4.86603 7.82143 4.83751 7.73522 4.83274 7.6461C4.82798 7.55699 4.84716 7.46822 4.88828 7.38902C4.9294 7.30982 4.99097 7.24307 5.0666 7.19569L7.73327 5.48903C7.84266 5.42345 7.9732 5.40279 8.09749 5.43138C8.22179 5.45997 8.33018 5.53558 8.39994 5.64236C8.46387 5.75216 8.4836 5.88219 8.45512 6.00602C8.42664 6.12985 8.35208 6.23819 8.2466 6.30903L6.35327 7.57569L8.21994 8.48903C8.30458 8.52872 8.376 8.59195 8.42565 8.67116C8.47531 8.75037 8.5011 8.84221 8.49994 8.93569V10.8424C8.49482 10.9721 8.4401 11.0949 8.34706 11.1855C8.25402 11.276 8.12976 11.3274 7.99994 11.329Z' fill='white' />
              </svg>
              <span>Total kill</span>
            </div>
            <div className='de-stats-value'>100</div>
          </div>
        </div>
      </div>
    </div>
  )
}
