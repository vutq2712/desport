export function TournamentRegisteredFeeRefund() {
  return (
    <div className='de-tournament-prize-claim refund'>
      <div className='de-claim-title'>Tournament Registered fee refund</div>
      <div className='row'>
        <div className='col-md-5'>
          <div className='de-claim-label'>Total refund</div>
          <div className='de-claim-value gold'>
            <span>500,000</span>
            <svg width='24' height='28' viewBox='0 0 24 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <ellipse opacity='0.2' cx='12' cy='12' rx='12' ry='12' fill='#E59C50' />
              <rect x='4.12207' y='11.9863' width='3.05498' height='3.05499' transform='rotate(-45 4.12207 11.9863)' fill='#E59C50' />
              <rect x='6.9917' y='14.856' width='11.1293' height='3.05202' transform='rotate(-45 6.9917 14.856)' fill='#E59C50' />
              <rect x='9.84668' y='17.7158' width='11.1293' height='3.0273' transform='rotate(-45 9.84668 17.7158)' fill='#E59C50' />
              <rect x='7' y='9.16016' width='7.10106' height='3.05499' transform='rotate(-45 7 9.16016)' fill='#E59C50' />
            </svg>
          </div>
        </div>
      </div>
      <button type='button' className='de-btn de-btn-primary de-px-10'>
        <span>Claim on des</span>
      </button>
    </div>
  )
}
