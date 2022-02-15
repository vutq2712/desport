import { useSession } from "@app/hooks/session";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function SettingSidebar(props) {
  const [expandSectionId, setExpandSectionId] = useState(5);
  const { logout } = useSession();

  return (
    <>
      <div className={`de-sidebar-right ${props.showSetting ? 'show' : ''}`} id='DESidebarRight'>
        <div className='bg'></div>
        <div className='de-sidebar-right-heading'>
          <Link href='/profile-setting'>
            <a className='de-sidebar-tab'>
              <div className='de-sidebar-tab-icon'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 22.66C11.5994 22.6581 11.2042 22.5675 10.8428 22.3946C10.4814 22.2217 10.1628 21.9708 9.91003 21.66L9.03003 20.66C8.9039 20.5128 8.74502 20.3972 8.56614 20.3225C8.38727 20.2479 8.19337 20.2162 8.00003 20.23L6.65003 20.35C6.25268 20.3835 5.85279 20.3302 5.47808 20.1938C5.10338 20.0574 4.76283 19.8411 4.48003 19.56C4.19981 19.2761 3.98348 18.9357 3.84551 18.5614C3.70754 18.1872 3.65112 17.7878 3.68003 17.39L3.79003 16C3.79572 15.8111 3.75917 15.6232 3.68305 15.4502C3.60693 15.2772 3.49316 15.1234 3.35003 15L2.35003 14.13C2.0449 13.8728 1.79964 13.552 1.63139 13.1902C1.46315 12.8283 1.37598 12.434 1.37598 12.035C1.37598 11.6359 1.46315 11.2417 1.63139 10.8798C1.79964 10.5179 2.0449 10.1972 2.35003 9.93997L3.35003 9.05998C3.49973 8.92978 3.616 8.76556 3.68909 8.58111C3.76217 8.39666 3.78993 8.19737 3.77003 7.99998L3.65003 6.64998C3.61132 6.24639 3.66233 5.83923 3.7994 5.45766C3.93648 5.0761 4.15623 4.72956 4.44292 4.44287C4.72961 4.15618 5.07615 3.93643 5.45772 3.79935C5.83928 3.66227 6.24644 3.61127 6.65003 3.64998L8.00003 3.78998C8.18895 3.79567 8.37676 3.75912 8.54976 3.683C8.72276 3.60688 8.87659 3.49311 9.00003 3.34998L9.87003 2.34998C10.1233 2.0397 10.4419 1.78918 10.8032 1.61632C11.1645 1.44345 11.5595 1.3525 11.96 1.34998C12.3607 1.35181 12.7559 1.44245 13.1173 1.61536C13.4787 1.78828 13.7972 2.03917 14.05 2.34998L14.93 3.34998C15.0623 3.49983 15.2283 3.61607 15.4143 3.6891C15.6004 3.76213 15.8011 3.78985 16 3.76998L17.35 3.64998C17.7536 3.61127 18.1608 3.66227 18.5423 3.79935C18.9239 3.93643 19.2704 4.15618 19.5571 4.44287C19.8438 4.72956 20.0636 5.0761 20.2007 5.45766C20.3377 5.83923 20.3887 6.24639 20.35 6.64998L20.21 7.99998C20.2043 8.1889 20.2409 8.37671 20.317 8.54971C20.3931 8.72271 20.5069 8.87654 20.65 8.99998L21.65 9.86998C21.9552 10.1272 22.2004 10.4479 22.3687 10.8098C22.5369 11.1717 22.6241 11.5659 22.6241 11.965C22.6241 12.364 22.5369 12.7583 22.3687 13.1202C22.2004 13.482 21.9552 13.8028 21.65 14.06L20.65 14.94C20.5003 15.0702 20.3841 15.2344 20.311 15.4188C20.2379 15.6033 20.2101 15.8026 20.23 16L20.35 17.35C20.3887 17.7536 20.3377 18.1607 20.2007 18.5423C20.0636 18.9239 19.8438 19.2704 19.5571 19.5571C19.2704 19.8438 18.9239 20.0635 18.5423 20.2006C18.1608 20.3377 17.7536 20.3887 17.35 20.35L16 20.21C15.8116 20.2077 15.6249 20.2458 15.4524 20.3217C15.2799 20.3976 15.1256 20.5095 15 20.65L14.13 21.65C13.8768 21.9603 13.5581 22.2108 13.1968 22.3836C12.8355 22.5565 12.4405 22.6474 12.04 22.65L12 22.66ZM8.10003 18.73C8.50017 18.7346 8.8945 18.8264 9.25548 18.9991C9.61646 19.1718 9.9354 19.4213 10.19 19.73L11.07 20.73C11.1867 20.8682 11.3322 20.9791 11.4963 21.0552C11.6604 21.1312 11.8392 21.1704 12.02 21.17C12.2105 21.1798 12.4005 21.1441 12.5744 21.0659C12.7483 20.9876 12.9011 20.869 13.02 20.72L13.89 19.72C14.1676 19.3787 14.5235 19.1096 14.9274 18.9355C15.3313 18.7614 15.7714 18.6874 16.21 18.72L17.56 18.82C17.7407 18.8354 17.9227 18.8109 18.0929 18.7484C18.2632 18.6859 18.4176 18.5867 18.5454 18.458C18.6732 18.3293 18.7711 18.1741 18.8324 18.0034C18.8937 17.8327 18.9168 17.6506 18.9 17.47L18.79 16.13C18.7575 15.6913 18.8314 15.2513 19.0055 14.8473C19.1796 14.4434 19.4488 14.0875 19.79 13.81L20.79 12.93C20.9282 12.8133 21.0392 12.6678 21.1152 12.5037C21.1912 12.3396 21.2304 12.1608 21.23 11.98C21.2399 11.7895 21.2042 11.5995 21.1259 11.4256C21.0477 11.2517 20.9291 11.0989 20.78 10.98L19.78 10.11C19.4401 9.83134 19.1718 9.47527 18.9979 9.0716C18.8239 8.66794 18.7492 8.22845 18.78 7.78998L18.88 6.43998C18.8954 6.25925 18.871 6.07735 18.8085 5.9071C18.7459 5.73685 18.6468 5.58239 18.5181 5.45461C18.3893 5.32684 18.2341 5.22886 18.0634 5.16758C17.8927 5.10631 17.7106 5.08323 17.53 5.09998L16.19 5.20998C15.7514 5.24253 15.3113 5.1686 14.9074 4.99449C14.5035 4.82037 14.1476 4.55123 13.87 4.20998L12.99 3.20998C12.8625 3.07918 12.7076 2.97818 12.5364 2.91422C12.3653 2.85026 12.1821 2.8249 12 2.83998C11.8096 2.83013 11.6195 2.86581 11.4456 2.94407C11.2717 3.02233 11.119 3.1409 11 3.28998L10.13 4.28998C9.84978 4.62804 9.49344 4.89492 9.09018 5.06873C8.68693 5.24255 8.24823 5.31837 7.81003 5.28998L6.46003 5.18998C6.27703 5.17139 6.0922 5.19409 5.91914 5.25639C5.74607 5.31869 5.58919 5.41902 5.46003 5.54998C5.33023 5.67997 5.23068 5.83697 5.16845 6.00981C5.10623 6.18265 5.08287 6.36708 5.10003 6.54998L5.21003 7.88998C5.24258 8.32864 5.16865 8.76867 4.99454 9.17261C4.82043 9.57655 4.55128 9.93244 4.21003 10.21L3.21003 11.09C3.07184 11.2067 2.96086 11.3522 2.88485 11.5163C2.80884 11.6804 2.76965 11.8591 2.77003 12.04C2.76018 12.2304 2.79586 12.4205 2.87412 12.5944C2.95238 12.7683 3.07096 12.921 3.22003 13.04L4.22003 13.91C4.55999 14.1886 4.82821 14.5447 5.00221 14.9483C5.1762 15.352 5.25089 15.7915 5.22003 16.23L5.12003 17.58C5.10216 17.7629 5.1252 17.9475 5.18746 18.1205C5.24972 18.2935 5.34965 18.4504 5.48003 18.58C5.60876 18.7115 5.76559 18.8123 5.93877 18.8746C6.11194 18.9369 6.29698 18.9593 6.48003 18.94L7.82003 18.83L8.10003 18.73Z' fill='#5062E5' />
                  <path d='M12 15.75C11.0054 15.75 10.0516 15.3549 9.34835 14.6517C8.64509 13.9484 8.25 12.9946 8.25 12C8.25 11.0054 8.64509 10.0516 9.34835 9.34835C10.0516 8.64509 11.0054 8.25 12 8.25C12.9946 8.25 13.9484 8.64509 14.6517 9.34835C15.3549 10.0516 15.75 11.0054 15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75ZM12 9.75C11.4033 9.75 10.831 9.98705 10.409 10.409C9.98705 10.831 9.75 11.4033 9.75 12C9.75 12.5967 9.98705 13.169 10.409 13.591C10.831 14.0129 11.4033 14.25 12 14.25C12.5967 14.25 13.169 14.0129 13.591 13.591C14.0129 13.169 14.25 12.5967 14.25 12C14.25 11.4033 14.0129 10.831 13.591 10.409C13.169 9.98705 12.5967 9.75 12 9.75Z' fill='#5062E5' />
                </svg>
              </div>
              <span>My Profile</span>
            </a>
          </Link>
        </div>
        <div className='de-sidebar-right-content'>
          <div className='accordion' id='accordionSettings'>
            <div className='de-sidebar-right-menu-item'>
              <div id='headings1' onClick={() => setExpandSectionId(1)} className={`accordion-button ${expandSectionId != 1 ? 'collapsed' : ''}`} aria-expanded={expandSectionId === 1} aria-controls='collapses1'>
                Tournaments
              </div>
              <div id='collapses1' className={`accordion-collapse collapse ${expandSectionId === 1 ? 'show' : ''}`} aria-labelledby='headings1'>
                <div className='accordion-body'>Comingsoon...</div>
              </div>
            </div>
            <div className='de-sidebar-right-menu-item'>
              <div id='headings2' onClick={() => setExpandSectionId(2)} className={`accordion-button ${expandSectionId != 2 ? 'collapsed' : ''}`} aria-expanded={expandSectionId === 2} aria-controls='collapses2'>
                Ladders
              </div>
              <div id='collapses2' className={`accordion-collapse collapse ${expandSectionId === 2 ? 'show' : ''}`} aria-labelledby='headings2'>
                <div className='accordion-body'>Comingsoon...</div>
              </div>
            </div>
            <div className='de-sidebar-right-menu-item'>
              <div id='headings3' onClick={() => setExpandSectionId(3)} className={`accordion-button ${expandSectionId != 3 ? 'collapsed' : ''}`} aria-expanded={expandSectionId === 3} aria-controls='collapses3'>
                My Teams
              </div>
              <div id='collapses3' className={`accordion-collapse collapse ${expandSectionId === 3 ? 'show' : ''}`} aria-labelledby='headings3'>
                <div className='accordion-body'>Comingsoon...</div>
              </div>
            </div>
            <div className='de-sidebar-right-menu-item'>
              <div id='headings4' onClick={() => setExpandSectionId(4)} className={`accordion-button ${expandSectionId != 4 ? 'collapsed' : ''}`} aria-expanded={expandSectionId === 4} aria-controls='collapses4'>
                My Guilds
              </div>
              <div id='collapses4' className={`accordion-collapse collapse ${expandSectionId === 4 ? 'show' : ''}`} aria-labelledby='headings4'>
                <div className='accordion-body'>Comingsoon...</div>
              </div>
            </div>
            <div className='de-sidebar-right-menu-item'>
              <div id='headings5' onClick={() => setExpandSectionId(5)} className={`accordion-button ${expandSectionId != 5 ? 'collapsed' : ''}`} aria-expanded={expandSectionId === 5} aria-controls='collapses5'>
                Friends
              </div>
              <div id='collapses5' className={`accordion-collapse collapse ${expandSectionId === 5 ? 'show' : ''}`} aria-labelledby='headings5'>
                <div className='accordion-body'>
                  <div className='de-user-card'>
                    <div className='de-user-card-avatar'>
                      <img src='/assets/images/users/user-1.png' alt='User 1' />
                    </div>
                    <div className='de-user-card-info'>
                      <div className='de-user-card-username'>Dash</div>
                      <div className='de-user-card-title'>Creative Director</div>
                      <div className='de-user-card-status online'></div>
                      <div className='de-user-card-flag'>
                        <img src='/assets/images/flags/Vietnam.png' alt='vi' />
                      </div>
                    </div>
                  </div>

                  <div className='de-user-card'>
                    <div className='de-user-card-avatar'>
                      <img src='/assets/images/users/user-2.png' alt='User 2' />
                    </div>
                    <div className='de-user-card-info'>
                      <div className='de-user-card-username'>Dash</div>
                      <div className='de-user-card-title'>Creative Director</div>
                      <div className='de-user-card-status online'></div>
                      <div className='de-user-card-flag'>
                        <img src='/assets/images/flags/Vietnam.png' alt='vi' />
                      </div>
                    </div>
                  </div>

                  <div className='de-user-card'>
                    <div className='de-user-card-avatar'>
                      <img src='/assets/images/users/user-3.png' alt='User 3' />
                    </div>
                    <div className='de-user-card-info'>
                      <div className='de-user-card-username'>Dash</div>
                      <div className='de-user-card-title'>Creative Director</div>
                      <div className='de-user-card-status online'></div>
                      <div className='de-user-card-flag'>
                        <img src='/assets/images/flags/Vietnam.png' alt='vi' />
                      </div>
                    </div>
                  </div>

                  <div className='de-user-card'>
                    <div className='de-user-card-avatar'>
                      <img src='/assets/images/users/user-4.png' alt='User 4' />
                    </div>
                    <div className='de-user-card-info'>
                      <div className='de-user-card-username'>Dash</div>
                      <div className='de-user-card-title'>Creative Director</div>
                      <div className='de-user-card-status online'></div>
                      <div className='de-user-card-flag'>
                        <img src='/assets/images/flags/Vietnam.png' alt='vi' />
                      </div>
                    </div>
                  </div>

                  <div className='de-user-card'>
                    <div className='de-user-card-avatar'>
                      <img src='/assets/images/users/user-5.png' alt='User 5' />
                    </div>
                    <div className='de-user-card-info'>
                      <div className='de-user-card-username'>Dash</div>
                      <div className='de-user-card-title'>Creative Director</div>
                      <div className='de-user-card-status online'></div>
                      <div className='de-user-card-flag'>
                        <img src='/assets/images/flags/Vietnam.png' alt='vi' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='de-sidebar-right-footer'>
          <button onClick={logout} type='button' className='de-btn de-btn-outline-primary w-100'>
            Log out
          </button>
        </div>
      </div>
    </>

  )
}
