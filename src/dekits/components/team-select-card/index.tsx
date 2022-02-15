export function TeamSelectCard(props) {
  return (
    <div className={`de-team-select-card ${props.selected ? 'selected' : ''}`} onClick={props.onSelect}>
      <div className='team-select-info'>
        <div className='team-select-logo'>
          <img src={props.logo} alt='' />
        </div>
        <div className='team-select-name'>{props.name}</div>
      </div>
      <div className='team-select-members'>{props.members} {props.members > 1 ? 'Member' : 'Members'}</div>
    </div>
  )
}
