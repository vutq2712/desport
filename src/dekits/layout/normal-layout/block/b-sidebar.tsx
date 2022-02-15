import Link from 'next/link';
import { useSession } from '@app/hooks/session';
import Logo from 'styles/uikit/media/iconset/Logo.svg';

export default function Sidebar() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='de-sidebar-left'>
      <div className='de-sidebar-left-inner'>
        <div className='de-logo'>
          <div className='de-sidebar-menu-item'>
            <Link href='/'>
              <a>
                <img src={Logo.src} alt='DESPORTS' />
              </a>
            </Link>
          </div>
        </div>
        <div className='de-sidebar-game'>
          <div className='de-sidebar-game-heading'>
            <div className='de-sidebar-menu-item'>
              <Link href='/'>
                <a>
                  <img src='/assets/icons/game-pad.png' alt='GamePad' />
                </a>
              </Link>
            </div>
          </div>
          <ul>
            <li className='de-sidebar-menu-item'>
              <Link href='/'>
                <a>
                  <img src='/assets/icons/LoL.png' alt='LoL' />
                </a>
              </Link>
            </li>
            <li className='de-sidebar-menu-item'>
              <Link href='/'>
                <a>
                  <img src='/assets/icons/CallOfDuty.png' alt='CallOfDuty' />
                </a>
              </Link>
            </li>
            <li className='de-sidebar-menu-item'>
              <Link href='/'>
                <a>
                  <img src='/assets/icons/Halo.png' alt='Halo' />
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='copyright'>
          <div className='de-credit'>
            {currentYear} ®<br />Desports
          </div>
        </div>
      </div>
    </div>
  )
}
