export function ProfileSelectCard(props) {
  return (
    <div className={`de-profile-select-card ${props.selected ? 'selected' : ''}`} onClick={props.onSelect}>
      <div className='profile-select-logo'>
        <img src={props.logo} alt='' />
      </div>
      <div className='profile-select-info'>
        <div className='profile-select-label'>{props.label}</div>
        <div className='profile-select-name'>{props.name}</div>
      </div>
    </div>
  )
}
