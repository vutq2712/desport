export function StandingInfo() {
  return (
    <div className='de-bracket-tab-content'>
      <div className='de-standing-info'>
        <div className='de-form-group form-group'>
          <div className='de-form-control-with-icon'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M9.75 17.27C8.26664 17.27 6.8166 16.8302 5.58323 16.006C4.34986 15.1819 3.38856 14.0106 2.82091 12.6401C2.25325 11.2697 2.10472 9.7617 2.39411 8.30685C2.6835 6.85199 3.39781 5.51562 4.4467 4.46672C5.4956 3.41783 6.83197 2.70352 8.28683 2.41413C9.74168 2.12474 11.2497 2.27327 12.6201 2.84093C13.9906 3.40858 15.1619 4.36988 15.986 5.60325C16.8101 6.83661 17.25 8.28666 17.25 9.77002C17.25 11.7591 16.4598 13.6668 15.0533 15.0733C13.6468 16.4798 11.7391 17.27 9.75 17.27ZM9.75 3.77002C8.56332 3.77002 7.40328 4.12192 6.41658 4.78121C5.42989 5.44049 4.66085 6.37757 4.20673 7.47392C3.7526 8.57028 3.63378 9.77668 3.86529 10.9406C4.0968 12.1045 4.66825 13.1735 5.50736 14.0127C6.34648 14.8518 7.41558 15.4232 8.57946 15.6547C9.74335 15.8862 10.9497 15.7674 12.0461 15.3133C13.1425 14.8592 14.0795 14.0901 14.7388 13.1034C15.3981 12.1167 15.75 10.9567 15.75 9.77002C15.75 8.17872 15.1179 6.6526 13.9926 5.52738C12.8674 4.40216 11.3413 3.77002 9.75 3.77002Z' fill='white' />
              <path d='M21 21.7699C20.9015 21.7704 20.8039 21.7512 20.7128 21.7134C20.6218 21.6756 20.5393 21.6201 20.47 21.5499L14 15.0699C13.9258 15.0019 13.8661 14.9197 13.8244 14.8281C13.7826 14.7366 13.7598 14.6375 13.7571 14.5369C13.7544 14.4363 13.7721 14.3362 13.8089 14.2425C13.8457 14.1489 13.901 14.0636 13.9715 13.9918C14.042 13.92 14.1262 13.863 14.2192 13.8244C14.3121 13.7858 14.4119 13.7663 14.5125 13.7671C14.6131 13.7679 14.7126 13.7889 14.8049 13.8289C14.8973 13.8689 14.9806 13.9271 15.05 13.9999L21.53 20.4799C21.6705 20.6206 21.7494 20.8112 21.7494 21.0099C21.7494 21.2087 21.6705 21.3993 21.53 21.5399C21.4616 21.6119 21.3795 21.6693 21.2884 21.7088C21.1974 21.7483 21.0993 21.7691 21 21.7699Z' fill='white' />
            </svg>
            <input className='de-form-control form-control' placeholder='Search tournament...' />
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table de-table table-borderless mb-0'>
            <tbody>
              <tr>
                <th>Team</th>
                <th className='de-px-2'>Total</th>
                <th className='text-center' style={{ width: 100 }}>Week 1</th>
                <th className='text-center' style={{ width: 100 }}>Week 2</th>
                <th className='text-center' style={{ width: 100 }}>Week 3</th>
                <th className='text-center' style={{ width: 100 }}>Week 4</th>
                <th className='text-center' style={{ width: 100 }}>Week 5</th>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Natus Vincere' height={32} />
                  <span className='de-ms-1'>Natus Vincere</span>
                </td>
                <td>
                  <span className='gold'>100
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M8 14.4399C7.86793 14.4382 7.74175 14.3849 7.64836 14.2915C7.55496 14.1981 7.50173 14.072 7.5 13.9399V10.2266C7.5 10.094 7.55268 9.96678 7.64645 9.87301C7.74022 9.77924 7.86739 9.72656 8 9.72656C8.13261 9.72656 8.25978 9.77924 8.35355 9.87301C8.44732 9.96678 8.5 10.094 8.5 10.2266V13.9399C8.49827 14.072 8.44504 14.1981 8.35164 14.2915C8.25825 14.3849 8.13207 14.4382 8 14.4399Z' fill='#E59C50' />
                      <path d='M7.99996 10.7268C6.98153 10.7268 6.00481 10.3222 5.28467 9.60206C4.56453 8.88192 4.15996 7.9052 4.15996 6.88677V2.43343C4.14981 2.28917 4.14981 2.14437 4.15996 2.0001C4.16827 1.93488 4.18936 1.87193 4.222 1.81485C4.25464 1.75778 4.29821 1.70769 4.35021 1.66745C4.40221 1.62721 4.46163 1.59761 4.52507 1.58034C4.58851 1.56306 4.65473 1.55845 4.71996 1.56677C4.78518 1.57508 4.84813 1.59617 4.9052 1.62881C4.96228 1.66145 5.01237 1.70502 5.0526 1.75702C5.09284 1.80902 5.12245 1.86844 5.13972 1.93188C5.157 1.99532 5.16161 2.06154 5.15329 2.12677C5.14622 2.22887 5.14622 2.33133 5.15329 2.43343V6.88677C5.15329 7.63998 5.4525 8.36235 5.98511 8.89495C6.51771 9.42755 7.24008 9.72677 7.99329 9.72677C8.74651 9.72677 9.46887 9.42755 10.0015 8.89495C10.5341 8.36235 10.8333 7.63998 10.8333 6.88677V2.43343C10.8404 2.33133 10.8404 2.22887 10.8333 2.12677C10.8363 2.0075 10.8819 1.89325 10.9618 1.80465C11.0418 1.71606 11.1507 1.65896 11.269 1.64366C11.3874 1.62837 11.5073 1.65589 11.6071 1.72126C11.7069 1.78662 11.78 1.88552 11.8133 2.0001C11.8234 2.14437 11.8234 2.28917 11.8133 2.43343V6.88677C11.8133 7.90059 11.4124 8.87329 10.698 9.59267C9.98364 10.312 9.01376 10.7197 7.99996 10.7268Z' fill='#E59C50' />
                      <path d='M11.7001 6.66668C11.6085 6.66588 11.5187 6.64056 11.4401 6.59334L11.0801 6.38001C10.9724 6.31124 10.8951 6.20383 10.8641 6.07984C10.8331 5.95586 10.8508 5.82471 10.9135 5.71334C10.98 5.60321 11.087 5.52344 11.2115 5.49106C11.3361 5.45868 11.4684 5.47624 11.5801 5.54001L11.8135 5.68001C13.5935 5.54668 14.0001 3.52001 14.1335 2.56001H1.86681C1.96014 3.52668 2.38681 5.54668 4.16681 5.64001L4.40014 5.50001C4.51192 5.43624 4.64419 5.41868 4.76874 5.45106C4.89328 5.48344 5.00025 5.56321 5.06681 5.67334C5.12949 5.78471 5.14715 5.91586 5.11615 6.03984C5.08516 6.16383 5.00786 6.27124 4.90014 6.34001L4.54014 6.55334C4.46158 6.60056 4.3718 6.62588 4.28014 6.62668C1.54014 6.62668 0.813477 3.62668 0.813477 2.04001C0.820385 1.90797 0.878634 1.78386 0.975789 1.69418C1.07294 1.6045 1.20131 1.55635 1.33348 1.56001H14.6668C14.7989 1.56174 14.9251 1.61497 15.0185 1.70836C15.1119 1.80176 15.1651 1.92794 15.1668 2.06001C15.1668 3.64668 14.4401 6.66668 11.7001 6.66668Z' fill='#E59C50' />
                      <path d='M11.7135 14.4399H5.04688C4.91427 14.4399 4.78709 14.3873 4.69332 14.2935C4.59955 14.1997 4.54688 14.0725 4.54688 13.9399C4.54688 13.8073 4.59955 13.6802 4.69332 13.5864C4.78709 13.4926 4.91427 13.4399 5.04688 13.4399H11.7135C11.8461 13.4399 11.9733 13.4926 12.0671 13.5864C12.1609 13.6802 12.2135 13.8073 12.2135 13.9399C12.2135 14.0725 12.1609 14.1997 12.0671 14.2935C11.9733 14.3873 11.8461 14.4399 11.7135 14.4399Z' fill='#E59C50' />
                    </svg>
                  </span>
                </td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Virtus Pro' height={32} />
                  <span className='de-ms-1'>Virtus Pro</span>
                </td>
                <td>
                  <span className='silver'>90
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M8 14.4399C7.86793 14.4382 7.74175 14.3849 7.64836 14.2915C7.55496 14.1981 7.50173 14.072 7.5 13.9399V10.2266C7.5 10.094 7.55268 9.96678 7.64645 9.87301C7.74022 9.77924 7.86739 9.72656 8 9.72656C8.13261 9.72656 8.25978 9.77924 8.35355 9.87301C8.44732 9.96678 8.5 10.094 8.5 10.2266V13.9399C8.49827 14.072 8.44504 14.1981 8.35164 14.2915C8.25825 14.3849 8.13207 14.4382 8 14.4399Z' fill='#B1B7E1' />
                      <path d='M7.99996 10.7268C6.98153 10.7268 6.00481 10.3222 5.28467 9.60206C4.56453 8.88192 4.15996 7.9052 4.15996 6.88677V2.43343C4.14981 2.28917 4.14981 2.14437 4.15996 2.0001C4.16827 1.93488 4.18936 1.87193 4.222 1.81485C4.25464 1.75778 4.29821 1.70769 4.35021 1.66745C4.40221 1.62721 4.46163 1.59761 4.52507 1.58034C4.58851 1.56306 4.65473 1.55845 4.71996 1.56677C4.78518 1.57508 4.84813 1.59617 4.9052 1.62881C4.96228 1.66145 5.01237 1.70502 5.0526 1.75702C5.09284 1.80902 5.12245 1.86844 5.13972 1.93188C5.157 1.99532 5.16161 2.06154 5.15329 2.12677C5.14622 2.22887 5.14622 2.33133 5.15329 2.43343V6.88677C5.15329 7.63998 5.4525 8.36235 5.98511 8.89495C6.51771 9.42755 7.24008 9.72677 7.99329 9.72677C8.74651 9.72677 9.46887 9.42755 10.0015 8.89495C10.5341 8.36235 10.8333 7.63998 10.8333 6.88677V2.43343C10.8404 2.33133 10.8404 2.22887 10.8333 2.12677C10.8363 2.0075 10.8819 1.89325 10.9618 1.80465C11.0418 1.71606 11.1507 1.65896 11.269 1.64366C11.3874 1.62837 11.5073 1.65589 11.6071 1.72126C11.7069 1.78662 11.78 1.88552 11.8133 2.0001C11.8234 2.14437 11.8234 2.28917 11.8133 2.43343V6.88677C11.8133 7.90059 11.4124 8.87329 10.698 9.59267C9.98364 10.312 9.01376 10.7197 7.99996 10.7268Z' fill='#B1B7E1' />
                      <path d='M11.7001 6.66668C11.6085 6.66588 11.5187 6.64056 11.4401 6.59334L11.0801 6.38001C10.9724 6.31124 10.8951 6.20383 10.8641 6.07984C10.8331 5.95586 10.8508 5.82471 10.9135 5.71334C10.98 5.60321 11.087 5.52344 11.2115 5.49106C11.3361 5.45868 11.4684 5.47624 11.5801 5.54001L11.8135 5.68001C13.5935 5.54668 14.0001 3.52001 14.1335 2.56001H1.86681C1.96014 3.52668 2.38681 5.54668 4.16681 5.64001L4.40014 5.50001C4.51192 5.43624 4.64419 5.41868 4.76874 5.45106C4.89328 5.48344 5.00025 5.56321 5.06681 5.67334C5.12949 5.78471 5.14715 5.91586 5.11615 6.03984C5.08516 6.16383 5.00786 6.27124 4.90014 6.34001L4.54014 6.55334C4.46158 6.60056 4.3718 6.62588 4.28014 6.62668C1.54014 6.62668 0.813477 3.62668 0.813477 2.04001C0.820385 1.90797 0.878634 1.78386 0.975789 1.69418C1.07294 1.6045 1.20131 1.55635 1.33348 1.56001H14.6668C14.7989 1.56174 14.9251 1.61497 15.0185 1.70836C15.1119 1.80176 15.1651 1.92794 15.1668 2.06001C15.1668 3.64668 14.4401 6.66668 11.7001 6.66668Z' fill='#B1B7E1' />
                      <path d='M11.7135 14.4399H5.04688C4.91427 14.4399 4.78709 14.3873 4.69332 14.2935C4.59955 14.1997 4.54688 14.0725 4.54688 13.9399C4.54688 13.8073 4.59955 13.6802 4.69332 13.5864C4.78709 13.4926 4.91427 13.4399 5.04688 13.4399H11.7135C11.8461 13.4399 11.9733 13.4926 12.0671 13.5864C12.1609 13.6802 12.2135 13.8073 12.2135 13.9399C12.2135 14.0725 12.1609 14.1997 12.0671 14.2935C11.9733 14.3873 11.8461 14.4399 11.7135 14.4399Z' fill='#B1B7E1' />
                    </svg>
                  </span>
                </td>
                <td className='text-center'>90</td>
                <td className='text-center'>-</td>
                <td className='text-center'>90</td>
                <td className='text-center'>90</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team A' height={32} />
                  <span className='de-ms-1'>Team A</span>
                </td>
                <td>
                  <span className='bronze'>120
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M8 14.4399C7.86793 14.4382 7.74175 14.3849 7.64836 14.2915C7.55496 14.1981 7.50173 14.072 7.5 13.9399V10.2266C7.5 10.094 7.55268 9.96678 7.64645 9.87301C7.74022 9.77924 7.86739 9.72656 8 9.72656C8.13261 9.72656 8.25978 9.77924 8.35355 9.87301C8.44732 9.96678 8.5 10.094 8.5 10.2266V13.9399C8.49827 14.072 8.44504 14.1981 8.35164 14.2915C8.25825 14.3849 8.13207 14.4382 8 14.4399Z' fill='#954000' />
                      <path d='M7.99996 10.7268C6.98153 10.7268 6.00481 10.3222 5.28467 9.60206C4.56453 8.88192 4.15996 7.9052 4.15996 6.88677V2.43343C4.14981 2.28917 4.14981 2.14437 4.15996 2.0001C4.16827 1.93488 4.18936 1.87193 4.222 1.81485C4.25464 1.75778 4.29821 1.70769 4.35021 1.66745C4.40221 1.62721 4.46163 1.59761 4.52507 1.58034C4.58851 1.56306 4.65473 1.55845 4.71996 1.56677C4.78518 1.57508 4.84813 1.59617 4.9052 1.62881C4.96228 1.66145 5.01237 1.70502 5.0526 1.75702C5.09284 1.80902 5.12245 1.86844 5.13972 1.93188C5.157 1.99532 5.16161 2.06154 5.15329 2.12677C5.14622 2.22887 5.14622 2.33133 5.15329 2.43343V6.88677C5.15329 7.63998 5.4525 8.36235 5.98511 8.89495C6.51771 9.42755 7.24008 9.72677 7.99329 9.72677C8.74651 9.72677 9.46887 9.42755 10.0015 8.89495C10.5341 8.36235 10.8333 7.63998 10.8333 6.88677V2.43343C10.8404 2.33133 10.8404 2.22887 10.8333 2.12677C10.8363 2.0075 10.8819 1.89325 10.9618 1.80465C11.0418 1.71606 11.1507 1.65896 11.269 1.64366C11.3874 1.62837 11.5073 1.65589 11.6071 1.72126C11.7069 1.78662 11.78 1.88552 11.8133 2.0001C11.8234 2.14437 11.8234 2.28917 11.8133 2.43343V6.88677C11.8133 7.90059 11.4124 8.87329 10.698 9.59267C9.98364 10.312 9.01376 10.7197 7.99996 10.7268Z' fill='#954000' />
                      <path d='M11.7001 6.66668C11.6085 6.66588 11.5187 6.64056 11.4401 6.59334L11.0801 6.38001C10.9724 6.31124 10.8951 6.20383 10.8641 6.07984C10.8331 5.95586 10.8508 5.82471 10.9135 5.71334C10.98 5.60321 11.087 5.52344 11.2115 5.49106C11.3361 5.45868 11.4684 5.47624 11.5801 5.54001L11.8135 5.68001C13.5935 5.54668 14.0001 3.52001 14.1335 2.56001H1.86681C1.96014 3.52668 2.38681 5.54668 4.16681 5.64001L4.40014 5.50001C4.51192 5.43624 4.64419 5.41868 4.76874 5.45106C4.89328 5.48344 5.00025 5.56321 5.06681 5.67334C5.12949 5.78471 5.14715 5.91586 5.11615 6.03984C5.08516 6.16383 5.00786 6.27124 4.90014 6.34001L4.54014 6.55334C4.46158 6.60056 4.3718 6.62588 4.28014 6.62668C1.54014 6.62668 0.813477 3.62668 0.813477 2.04001C0.820385 1.90797 0.878634 1.78386 0.975789 1.69418C1.07294 1.6045 1.20131 1.55635 1.33348 1.56001H14.6668C14.7989 1.56174 14.9251 1.61497 15.0185 1.70836C15.1119 1.80176 15.1651 1.92794 15.1668 2.06001C15.1668 3.64668 14.4401 6.66668 11.7001 6.66668Z' fill='#954000' />
                      <path d='M11.7135 14.4399H5.04688C4.91427 14.4399 4.78709 14.3873 4.69332 14.2935C4.59955 14.1997 4.54688 14.0725 4.54688 13.9399C4.54688 13.8073 4.59955 13.6802 4.69332 13.5864C4.78709 13.4926 4.91427 13.4399 5.04688 13.4399H11.7135C11.8461 13.4399 11.9733 13.4926 12.0671 13.5864C12.1609 13.6802 12.2135 13.8073 12.2135 13.9399C12.2135 14.0725 12.1609 14.1997 12.0671 14.2935C11.9733 14.3873 11.8461 14.4399 11.7135 14.4399Z' fill='#954000' />
                    </svg>
                  </span>
                </td>
                <td className='text-center'>120</td>
                <td className='text-center'>120</td>
                <td className='text-center'>120</td>
                <td className='text-center'>120</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team B' height={32} />
                  <span className='de-ms-1'>Team B</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team C' height={32} />
                  <span className='de-ms-1'>Team C</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team D' height={32} />
                  <span className='de-ms-1'>Team D</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team E' height={32} />
                  <span className='de-ms-1'>Team E</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team F' height={32} />
                  <span className='de-ms-1'>Team F</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team G' height={32} />
                  <span className='de-ms-1'>Team G</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team H' height={32} />
                  <span className='de-ms-1'>Team H</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team I' height={32} />
                  <span className='de-ms-1'>Team I</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
              <tr>
                <td>
                  <img src='/assets/images/team-logo-3.png' alt='Team K' height={32} />
                  <span className='de-ms-1'>Team K</span>
                </td>
                <td>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>100</td>
                <td className='text-center'>-</td>
                <td className='text-center'>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
