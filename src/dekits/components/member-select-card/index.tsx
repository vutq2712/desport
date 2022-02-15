import { useState } from "react"
import { SelectMemberProfile } from "../select-member-profile";

export function MemberSelectCard(props) {
  const handleOnSelectedChange = () => {
    props.onSelect(!props.selected);
  }

  return (
    <div className={`de-member-select-card ${props.selected ? 'selected' : ''}`}>
      <div className='member-select-logo'>
        <img src={props.logo} alt='' />
      </div>
      <div className='member-select-info'>
        <div className='member-select-name'>
          <span>{props.name}</span>
          {
            props.captain ? <span className='de-tag gradient-solid de-mb-0 de-ms-1 de-tag-user'>Captain</span> : <></>
          }
          {
            props.online ? <svg className='de-ms-1' width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='4' cy='4.5' r='4' fill='#609A5B' />
            </svg> : <></>
          }
        </div>
        {
          props.label ? <div className='member-select-label'>{props.label}</div> : <></>
        }
      </div>
      <div className='member-select-action'>
        <SelectMemberProfile disabled={!props.selected} member={props.member} onSelectedProfile={props.onSelectedProfile} />
        <div className='de-form-check form-check'>
          <input className='de-form-check-input form-check-input' onClick={handleOnSelectedChange} type='checkbox' id='chk1' readOnly checked={props.selected} />
        </div>
      </div>
    </div>
  )
}
