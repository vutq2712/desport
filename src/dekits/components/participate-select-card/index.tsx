import { useState } from "react"

export function ParticipateSelectCard(props) {
  const [checked, setChecked] = useState(props.selected);
  const handleOnSelectedChange = () => {
    props.onSelect(!checked);
    setChecked(!checked);
  }
  return (
    <div className={`de-participate-select-card ${checked ? 'selected' : ''}`} onClick={handleOnSelectedChange}>
      <div className='participate-select-logo'>
        <img src={props.logo} alt='' />
      </div>
      <div className='participate-select-info'>
        <div className='participate-select-name'>
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
          props.label ? <div className={`participate-select-label ${props.captain ? 'gold' : ''}`}>{props.label}</div> : <></>
        }
      </div>
    </div>
  )
}
