export function ChatBox(props) {
  return (
    <div className='de-chatbox-wrap'>
      <div className='de-chatbox'>
        <div className='de-chatbox-user'>
          <div className='de-chatbox-user-avatar'>
            <img src='/assets/images/avatar.png' alt='Avatar' />
          </div>
          <div className='de-chatbox-user-name'>Jason Nguyen</div>
        </div>
        <div className='de-chatbox-input'>

        </div>
      </div>

      <div className='text-center'>
        <button type='button' onClick={props.onHideChat} className='de-btn de-btn-sm de-btn-outline-secondary'>
          <span>Hide chat</span>
        </button>
      </div>
    </div>
  )
}
