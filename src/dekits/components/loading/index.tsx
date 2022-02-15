import Logo from 'styles/uikit/media/iconset/Logo.svg';
export function Loading(props) {

  return (
    <>
      {props.show ? <div className='de-loading' id='DELoading'>
        <img src={Logo.src} alt='loading...' height='100' />
      </div> : <></>
      }
    </>
  )
}
