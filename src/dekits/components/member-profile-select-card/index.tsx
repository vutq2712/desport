export function MemberProfileSelectCard(props) {
  return (
    <div className={`de-member-profile-select-card ${props.selected ? 'selected' : ''}`} onClick={props.onSelect}>
      <div className='member-profile-select-logo'>
        {props.logo && <img src={props.logo} alt='' />}
      </div>
      <div className='member-profile-select-name'>{props.name}</div>
    </div>
  )
}
