export function ButtonCollapse(props: any) {
  return (
    <button onClick={props.onClick} type='button' className={`de-btn-collapse ${props.collapsed ? 'collapsed' : ''}`}>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z' fill='white' fillOpacity='0.1' />
        <path d='M10.8265 19.6136L15.9999 14.4403L21.1732 19.6136C21.6932 20.1336 22.5332 20.1336 23.0532 19.6136C23.5732 19.0936 23.5732 18.2536 23.0532 17.7336L16.9332 11.6136C16.4132 11.0936 15.5732 11.0936 15.0532 11.6136L8.93321 17.7336C8.41321 18.2536 8.41321 19.0936 8.93321 19.6136C9.45321 20.1203 10.3065 20.1336 10.8265 19.6136Z' fill='white' />
      </svg>
    </button>
  )
}
