export function GameAccount(props: any) {
  return (
    <div className='de-profile-account'>
      <div className='de-profile-account-logo'>
        <img src={props.logo} alt={props.game} />
      </div>
      <div className='de-profile-account-name'>{props.game}</div>
      <div className='de-profile-account-username'>{props.username}</div>
    </div>
  )
}
