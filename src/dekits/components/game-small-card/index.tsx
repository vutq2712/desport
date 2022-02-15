export function GameSmallCard(props: any) {
  return (
    <div className={`de-game-small-card ${props.bordered ? 'bordered' : ''}`}>
      <div className='logo'>
        {props.logo ? <img src={props.logo} alt={props.name} /> : <></>}
      </div>
      <div className='name'>{props.name}</div>
    </div>
  )
}
