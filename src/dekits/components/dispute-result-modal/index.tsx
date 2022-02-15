export function DisputeResultModal(props: any) {
  const { modalRef } = props;
  return (
    <div className='modal-body'>
      <div className='modal-title de-mb-3 text-uppercase'>Dispute result</div>
      <div className='modal-inner'>
        <div className='de-form-group form-group de-mb-3'>
          <div className='d-flex align-items-center flex-wrap'>
            <span className='opacity-50 de-me-1 pe-1'>Dispute for match:</span>
            <img src='/assets/images/team-logo-2.png' alt='Team Liquid' height={24} />
            <span className='de-ms-1'>Team Liquid</span>
            <span className='opacity-50 de-mx-1 px-1'>vs</span>
            <img src='/assets/images/team-logo-3.png' alt='Heroic' height={24} />
            <span className='de-ms-1'>Heroic</span>
          </div>
        </div>
        <div className='de-form-group form-group de-mb-3'>
          <textarea style={{ height: 140 }} className='de-form-control form-control' rows={4}>Wrong score report, it should be 2 - 1 for Team Liquid.</textarea>
        </div>
        <div className='de-form-group form-group de-mb-3'>
          <div className='de-form-label'>Attach evidents</div>
          <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary'>
            <span>Upload files</span>
          </button>
        </div>
        <div className='de-form-check form-check de-mb-8'>
          <input className='de-form-check-input form-check-input' type='checkbox' id='chk1' checked />
          <label className='de-form-check-label form-check-label' htmlFor='chk1'>
            I agree to all <a href='#'>Policy and Regulation.</a>
          </label>
        </div>
      </div>
      <div className='modal-actions'>
        <button type='button' className='de-btn' onClick={modalRef.close}>CANCEL</button>
        <button type='submit' className='de-btn de-btn-primary w-100' onClick={modalRef.close}>submit dispute</button>
      </div>
    </div>
  )
}
