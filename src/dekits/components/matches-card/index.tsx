export function MatchesCard(props) {
  return (
    <div className={`de-matches-card ${props.single ? 'single' : ''}`}>
      <div className='de-matches-card-inner'>
        <div className='de-matches-card-body'>
          {
            props.single ? <>
              <div className='de-matches-single'>
                <div className='de-matches-single-title'>VS</div>
                <div className='de-matches-logo'>
                  <img src='/assets/images/team-logo-1.png' alt='Virtus Pro' />
                </div>
                <div className='de-matches-name'>Team Liquid</div>
              </div>
            </> : <>
              <div className='de-matches-left'>
                <div className='de-matches-logo'>
                  <img src='/assets/images/team-logo-1.png' alt='Virtus Pro' />
                </div>
                <div className='de-matches-name'>Virtus Pro</div>
              </div>
              <div className='de-matches-right'>
                <div className='de-matches-logo'>
                  <img src='/assets/images/team-logo-1.png' alt='Virtus Pro' />
                </div>
                <div className='de-matches-name'>Team Liquid</div>
              </div>
            </>
          }
        </div>
      </div>
      <div className='de-matches-card-footer'>
        <div className='de-matches-info'>
          <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.56444 14.8585C7.23214 14.8585 5.92979 14.4633 4.82222 13.7228C3.71464 12.9824 2.85162 11.93 2.34238 10.6988C1.83315 9.4677 1.70059 8.11316 1.96148 6.80666C2.22237 5.50016 2.86498 4.30042 3.80799 3.35928C4.751 2.41814 5.95201 1.77791 7.25902 1.51961C8.56604 1.26131 9.9203 1.39655 11.1504 1.90823C12.3805 2.4199 13.4312 3.28501 14.1695 4.39405C14.9077 5.50309 15.3004 6.80622 15.2978 8.13852C15.2925 9.92145 14.581 11.6297 13.319 12.8891C12.057 14.1486 10.3474 14.8568 8.56444 14.8585ZM8.56444 2.39185C7.43106 2.39185 6.32311 2.72777 5.38056 3.35717C4.43801 3.98657 3.70315 4.88121 3.26882 5.92806C2.83449 6.97492 2.72017 8.12701 2.94031 9.23881C3.16046 10.3506 3.70518 11.3722 4.50567 12.1745C5.30616 12.9769 6.32649 13.524 7.43777 13.7467C8.54905 13.9694 9.70141 13.8578 10.7493 13.4259C11.7971 12.994 12.6935 12.2612 13.3251 11.3201C13.9566 10.3791 14.2951 9.27189 14.2978 8.13852C14.2986 7.38473 14.151 6.63815 13.8634 5.9414C13.5757 5.24466 13.1537 4.6114 12.6213 4.07777C12.0889 3.54414 11.4566 3.1206 10.7605 2.83133C10.0645 2.54206 9.31823 2.39272 8.56444 2.39185Z' fill='#8B5CE4' />
            <path d='M10.4378 10.4919C10.3719 10.4934 10.3065 10.4811 10.2456 10.4559C10.1848 10.4306 10.1299 10.3929 10.0845 10.3453L8.21112 8.47859C8.11732 8.38491 8.06457 8.25782 8.06445 8.12525V4.38525C8.06445 4.25265 8.11713 4.12547 8.2109 4.0317C8.30467 3.93793 8.43184 3.88525 8.56445 3.88525C8.69706 3.88525 8.82424 3.93793 8.91801 4.0317C9.01177 4.12547 9.06445 4.25265 9.06445 4.38525V7.91859L10.7911 9.63859C10.8848 9.73234 10.9373 9.85942 10.9373 9.99192C10.9373 10.1244 10.8848 10.2515 10.7911 10.3453C10.745 10.392 10.6899 10.429 10.6292 10.4542C10.5686 10.4794 10.5035 10.4922 10.4378 10.4919Z' fill='#8B5CE4' />
          </svg>
          <span>December 10 - 5.00 AM</span>
        </div>
        <div className='de-matches-info'>
          <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.56445 14.5786C8.43238 14.5768 8.30621 14.5236 8.21281 14.4302C8.11941 14.3368 8.06618 14.2106 8.06445 14.0786V10.3652C8.06445 10.2326 8.11713 10.1054 8.2109 10.0117C8.30467 9.91791 8.43184 9.86523 8.56445 9.86523C8.69706 9.86523 8.82424 9.91791 8.91801 10.0117C9.01177 10.1054 9.06445 10.2326 9.06445 10.3652V14.0786C9.06273 14.2106 9.00949 14.3368 8.9161 14.4302C8.8227 14.5236 8.69652 14.5768 8.56445 14.5786Z' fill='#8B5CE4' />
            <path d='M8.56447 10.8652C7.54604 10.8652 6.56932 10.4606 5.84918 9.74048C5.12904 9.02034 4.72447 8.04362 4.72447 7.02519V2.57186C4.71432 2.42759 4.71432 2.28279 4.72447 2.13853C4.73279 2.0733 4.75387 2.01036 4.78651 1.95328C4.81916 1.89621 4.86272 1.84612 4.91473 1.80588C4.96673 1.76564 5.02614 1.73604 5.08958 1.71876C5.15303 1.70149 5.21925 1.69688 5.28447 1.70519C5.3497 1.71351 5.41264 1.73459 5.46972 1.76724C5.52679 1.79988 5.57688 1.84345 5.61712 1.89545C5.65736 1.94745 5.68696 2.00687 5.70424 2.07031C5.72151 2.13375 5.72612 2.19997 5.71781 2.26519C5.71074 2.36729 5.71074 2.46976 5.71781 2.57186V7.02519C5.71781 7.77841 6.01702 8.50077 6.54962 9.03338C7.08223 9.56598 7.80459 9.86519 8.55781 9.86519C9.31102 9.86519 10.0334 9.56598 10.566 9.03338C11.0986 8.50077 11.3978 7.77841 11.3978 7.02519V2.57186C11.4049 2.46976 11.4049 2.36729 11.3978 2.26519C11.4009 2.14592 11.4464 2.03167 11.5264 1.94308C11.6063 1.85449 11.7152 1.79738 11.8335 1.78209C11.9519 1.7668 12.0718 1.79432 12.1716 1.85968C12.2714 1.92505 12.3445 2.02395 12.3778 2.13853C12.388 2.28279 12.388 2.42759 12.3778 2.57186V7.02519C12.3778 8.03902 11.9769 9.01172 11.2625 9.7311C10.5482 10.4505 9.57828 10.8582 8.56447 10.8652Z' fill='#8B5CE4' />
            <path d='M12.2645 6.8051C12.1728 6.80431 12.083 6.77899 12.0045 6.73177L11.6445 6.51844C11.5368 6.44966 11.4595 6.34226 11.4285 6.21827C11.3975 6.09429 11.4151 5.96314 11.4778 5.85177C11.5444 5.74163 11.6513 5.66187 11.7759 5.62949C11.9004 5.5971 12.0327 5.61467 12.1445 5.67844L12.3778 5.81844C14.1578 5.6851 14.5645 3.65844 14.6978 2.69844H2.43114C2.52447 3.6651 2.95114 5.6851 4.73114 5.77844L4.96447 5.63844C5.07625 5.57467 5.20852 5.5571 5.33307 5.58949C5.45761 5.62187 5.56458 5.70164 5.63114 5.81177C5.69382 5.92314 5.71148 6.05429 5.68048 6.17827C5.64949 6.30226 5.57219 6.40966 5.46447 6.47844L5.10447 6.69177C5.02591 6.73899 4.93613 6.76431 4.84447 6.7651C2.10447 6.7651 1.37781 3.7651 1.37781 2.17844C1.38472 2.0464 1.44297 1.92229 1.54012 1.83261C1.63728 1.74293 1.76564 1.69478 1.89781 1.69844H15.2311C15.3632 1.70016 15.4894 1.7534 15.5828 1.84679C15.6762 1.94019 15.7294 2.06637 15.7311 2.19844C15.7311 3.7851 15.0045 6.8051 12.2645 6.8051Z' fill='#8B5CE4' />
            <path d='M12.2778 14.5784H5.61115C5.47854 14.5784 5.35136 14.5257 5.25759 14.4319C5.16382 14.3382 5.11115 14.211 5.11115 14.0784C5.11115 13.9458 5.16382 13.8186 5.25759 13.7248C5.35136 13.631 5.47854 13.5784 5.61115 13.5784H12.2778C12.4104 13.5784 12.5376 13.631 12.6314 13.7248C12.7251 13.8186 12.7778 13.9458 12.7778 14.0784C12.7778 14.211 12.7251 14.3382 12.6314 14.4319C12.5376 14.5257 12.4104 14.5784 12.2778 14.5784Z' fill='#8B5CE4' />
          </svg>
          <span>The International 10</span>
        </div>
      </div>
    </div>
  )
}
