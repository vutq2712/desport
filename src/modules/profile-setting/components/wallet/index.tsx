import { ConnectWalletModal } from "@app/dekits/components/connect-wallet-modal";
import { MyWalletCard } from "@app/dekits/components/my-wallet-card";
import { openModal } from "@app/dekits/modal";
import { useCallback, useState } from "react";
import { TournamentDetail } from "./tour-detail";

export function ProfileWallet() {
  const [showDetail, setShowDetail] = useState(false);
  const MOCK_DATA = [
    { id: 1, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #1", type: "Claimed", value: 0.0049 },
    { id: 2, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #2", type: "Claimable", value: 0.0049 },
    { id: 3, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #3", type: "Claimed", value: 0.0049 },
    { id: 4, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #4", type: "Not ready", value: 0.0049 },
    { id: 5, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #5", type: "Claimed", value: 0.0049 },
    { id: 6, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #6", type: "Claimable", value: 0.0049 },
    { id: 7, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #7", type: "Claimed", value: 0.0049 },
    { id: 8, name: "[LATAM] Big Bang Series by Polygon: COD Mobile #8", type: "Not ready", value: 0.0049 }
  ]

  const handleConnectWalletClick = useCallback(() => {
    openModal(ConnectWalletModal, { dialogClassName: 'de-modal-md', closeButton: true });
  }, []);

  return (
    <>
      {
        showDetail ?
          <TournamentDetail /> :
          <div className='de-profile-block mb-5'>
            <div className='de-px-xl-8 de-px-4'>
              <div className='row de-gx-3'>
                <div className='col-lg-3'>
                  <MyWalletCard />
                  <button type='button' className='de-btn de-btn-outline-primary w-100 de-mb-2'  onClick={handleConnectWalletClick}>
                    <span>connect wallet</span>
                  </button>
                  <div className='de-my-wallet-menu'>
                    <ul>
                      <li>
                        <a href='#' className='active'>
                          <span>My Tournament</span>
                          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z' fill='white' />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <span>Help</span>
                          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z' fill='white' />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-lg-9'>
                  <div className='de-my-wallet-right-card'>
                    <div className='de-right-card-title'>
                                            My Tournament
                    </div>
                    <div className='de-right-card-tabs'>
                      <div className='row align-items-center'>
                        <div className='col-lg-8'>
                          <button type='button' className='de-right-card-tab active'>
                            <span>All tournament</span>
                          </button>
                          <button type='button' className='de-right-card-tab'>
                            <span>Not ready</span>
                          </button>
                          <button type='button' className='de-right-card-tab'>
                            <span>Claimable</span>
                          </button>
                          <button type='button' className='de-right-card-tab'>
                            <span>Claimed</span>
                          </button>
                        </div>
                        <div className='col-lg-4'>
                          <div className='de-form-group form-group'>
                            <div className='de-form-control-with-icon'>
                              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.75 17.27C8.26664 17.27 6.8166 16.8302 5.58323 16.006C4.34986 15.1819 3.38856 14.0106 2.82091 12.6401C2.25325 11.2697 2.10472 9.7617 2.39411 8.30685C2.6835 6.85199 3.39781 5.51562 4.4467 4.46672C5.4956 3.41783 6.83197 2.70352 8.28683 2.41413C9.74168 2.12474 11.2497 2.27327 12.6201 2.84093C13.9906 3.40858 15.1619 4.36988 15.986 5.60325C16.8101 6.83661 17.25 8.28666 17.25 9.77002C17.25 11.7591 16.4598 13.6668 15.0533 15.0733C13.6468 16.4798 11.7391 17.27 9.75 17.27ZM9.75 3.77002C8.56332 3.77002 7.40328 4.12192 6.41658 4.78121C5.42989 5.44049 4.66085 6.37757 4.20673 7.47392C3.7526 8.57028 3.63378 9.77668 3.86529 10.9406C4.0968 12.1045 4.66825 13.1735 5.50736 14.0127C6.34648 14.8518 7.41558 15.4232 8.57946 15.6547C9.74335 15.8862 10.9497 15.7674 12.0461 15.3133C13.1425 14.8592 14.0795 14.0901 14.7388 13.1034C15.3981 12.1167 15.75 10.9567 15.75 9.77002C15.75 8.17872 15.1179 6.6526 13.9926 5.52738C12.8674 4.40216 11.3413 3.77002 9.75 3.77002Z' fill='white' />
                                <path d='M21 21.7699C20.9015 21.7704 20.8039 21.7512 20.7128 21.7134C20.6218 21.6756 20.5393 21.6201 20.47 21.5499L14 15.0699C13.9258 15.0019 13.8661 14.9197 13.8244 14.8281C13.7826 14.7366 13.7598 14.6375 13.7571 14.5369C13.7544 14.4363 13.7721 14.3362 13.8089 14.2425C13.8457 14.1489 13.901 14.0636 13.9715 13.9918C14.042 13.92 14.1262 13.863 14.2192 13.8244C14.3121 13.7858 14.4119 13.7663 14.5125 13.7671C14.6131 13.7679 14.7126 13.7889 14.8049 13.8289C14.8973 13.8689 14.9806 13.9271 15.05 13.9999L21.53 20.4799C21.6705 20.6206 21.7494 20.8112 21.7494 21.0099C21.7494 21.2087 21.6705 21.3993 21.53 21.5399C21.4616 21.6119 21.3795 21.6693 21.2884 21.7088C21.1974 21.7483 21.0993 21.7691 21 21.7699Z' fill='white' />
                              </svg>
                              <input className='de-form-control form-control' placeholder='Search tournament...' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='de-right-card-body'>
                      <div className='table-responsive'>
                        <table className='table de-table table-borderless'>
                          <tbody>
                            {
                              MOCK_DATA.map((item, idx) => {
                                return <tr key={idx}>
                                  <td className='text-capitalize'>{item.name}</td>
                                  <td className='text-end'>
                                    <div className={`de-tag ${item.type === 'Claimed' ? 'success' : item.type === 'Claimable' ? 'primary' : 'secondary'}`}>{item.type}</div>
                                  </td>
                                  <td>
                                    <div className='de-sub-info-2'>
                                      <img src='/assets/images/eth-icon.svg' alt='eth' />
                                      <b>{item.value}</b>
                                      <span>USDC-P</span>
                                    </div>
                                  </td>
                                  <td className='text-end'>
                                    <button type='button' onClick={() => setShowDetail(true)} className='de-btn de-btn-sm de-btn-outline-secondary'>
                                      <span>Tour detail</span>
                                    </button>
                                  </td>
                                </tr>
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>

  )
}
