import Link from "next/link";
import { Col, Row, Tab, Tabs } from 'react-bootstrap';

export function BracketSwissTournament({ bracketSeedingHref, editBracketHref }) {
  return (
    <>
      <div className='de-ts-bracket-preview-header de-mb-4'>
        <h4>Swiss Tournament</h4>
        <div>
          <Link href={bracketSeedingHref}>
            <button type='submit' className='de-btn de-btn-outline-primary de-me-1'>Seeding</button>
          </Link>

          <Link href={editBracketHref}>
            <button type='submit' className='de-btn de-btn-outline-primary'>Edit setting</button>
          </Link>
        </div>
      </div>

      <div className='de-ts-brackets-tab'>
        <div className='de-bracket-preview-tab'>
          <Tabs className='de-bracket-preview-tabs' defaultActiveKey='matches' id='bracket-preview-tab'>
            <Tab eventKey='matches' title='Matches'>
              <div className='de-bracket-tab-content'>
                <div className='de-mb-3'>
                  <span className='de-round-title'>Rounds:</span>
                  <button type='button' className='de-ts-cat-tab de-round-number active'><span>1</span></button>
                </div>
                <div className='de-mb-3 d-flex align-items-center'>
                  <h4 className='de-round-name'>Round 1</h4>
                  <button type='button' className='de-btn de-btn-sm de-btn-outline-secondary de-round-edit'>
                    <span>Edit</span>
                    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M11.2499 15.3527H4.55994C3.88096 15.3507 3.23047 15.0796 2.75106 14.5988C2.27165 14.1179 2.00244 13.4667 2.00244 12.7877V6.12018C2.00244 5.44119 2.27165 4.78991 2.75106 4.30909C3.23047 3.82828 3.88096 3.55716 4.55994 3.55518H6.56244C6.71163 3.55518 6.8547 3.61444 6.96019 3.71993C7.06568 3.82542 7.12494 3.96849 7.12494 4.11768C7.12494 4.26686 7.06568 4.40993 6.96019 4.51542C6.8547 4.62091 6.71163 4.68018 6.56244 4.68018H4.55994C4.17933 4.68216 3.81499 4.83475 3.54655 5.10458C3.27812 5.37442 3.12744 5.73956 3.12744 6.12018V12.7877C3.12446 12.978 3.15926 13.1671 3.22983 13.3439C3.30039 13.5207 3.40532 13.6818 3.53853 13.8178C3.67175 13.9538 3.83062 14.0621 4.00594 14.1363C4.18126 14.2105 4.36956 14.2492 4.55994 14.2502H11.2499C11.439 14.2502 11.6263 14.2129 11.801 14.1406C11.9757 14.0682 12.1345 13.9621 12.2682 13.8284C12.4019 13.6947 12.508 13.5359 12.5803 13.3612C12.6527 13.1865 12.6899 12.9993 12.6899 12.8102V11.4527C12.6899 11.3035 12.7492 11.1604 12.8547 11.0549C12.9602 10.9494 13.1033 10.8902 13.2524 10.8902C13.4016 10.8902 13.5447 10.9494 13.6502 11.0549C13.7557 11.1604 13.8149 11.3035 13.8149 11.4527V12.7877C13.8149 13.1245 13.7486 13.4581 13.6197 13.7693C13.4908 14.0805 13.3019 14.3632 13.0637 14.6014C12.8255 14.8396 12.5427 15.0285 12.2315 15.1574C11.9203 15.2863 11.5868 15.3527 11.2499 15.3527Z' fill='currentColor' />
                      <path d='M13.2224 6.57732C13.0775 6.57562 12.9388 6.51885 12.8343 6.41855C12.7299 6.31826 12.6675 6.18195 12.6599 6.03732C12.6486 5.81052 12.5827 5.58979 12.4678 5.39392C12.3529 5.19805 12.1923 5.03284 11.9999 4.91232C11.7905 4.77873 11.5503 4.70125 11.3024 4.68732C11.2285 4.68486 11.1558 4.66787 11.0885 4.63733C11.0212 4.60679 10.9606 4.56329 10.9101 4.50931C10.8596 4.45534 10.8202 4.39195 10.7943 4.32276C10.7683 4.25357 10.7562 4.17994 10.7586 4.10607C10.7611 4.03221 10.7781 3.95955 10.8086 3.89224C10.8391 3.82494 10.8826 3.76431 10.9366 3.71382C10.9906 3.66333 11.054 3.62396 11.1232 3.59797C11.1924 3.57197 11.266 3.55986 11.3399 3.56232C11.9794 3.58634 12.5863 3.85063 13.0395 4.30246C13.4927 4.75428 13.7589 5.36039 13.7849 5.99982C13.7879 6.07371 13.7763 6.14746 13.7508 6.21686C13.7253 6.28626 13.6863 6.34995 13.6362 6.40429C13.586 6.45862 13.5256 6.50254 13.4585 6.53351C13.3913 6.56449 13.3187 6.58193 13.2449 6.58482L13.2224 6.57732Z' fill='currentColor' />
                      <path d='M9.74996 10.0201H7.89746C7.74828 10.0201 7.6052 9.96086 7.49971 9.85537C7.39422 9.74988 7.33496 9.6068 7.33496 9.45762V7.56762C7.33509 7.41849 7.39444 7.27551 7.49996 7.17012L11.25 3.42012C11.3017 3.36705 11.3635 3.32487 11.4318 3.29608C11.5 3.26728 11.5734 3.25244 11.6475 3.25244C11.7216 3.25244 11.7949 3.26728 11.8632 3.29608C11.9314 3.32487 11.9933 3.36705 12.045 3.42012L12.69 4.06512C12.7459 4.12081 12.7895 4.18765 12.818 4.26131C12.8464 4.33496 12.859 4.41377 12.855 4.49262C12.9338 4.48905 13.0124 4.50187 13.086 4.53027C13.1596 4.55867 13.2265 4.60203 13.2825 4.65762L13.935 5.30262C14.0403 5.40809 14.0995 5.55106 14.0995 5.70012C14.0995 5.84918 14.0403 5.99215 13.935 6.09762L10.185 9.84762C10.128 9.9044 10.06 9.94898 9.98521 9.97863C9.91043 10.0083 9.83038 10.0224 9.74996 10.0201ZM8.42996 8.89512H9.51746L12.75 5.67762L12.495 5.43012C12.4401 5.37363 12.3972 5.30666 12.3689 5.2332C12.3405 5.15974 12.3273 5.08131 12.33 5.00262C12.2511 5.00666 12.1723 4.99405 12.0986 4.96562C12.025 4.9372 11.9581 4.89358 11.9025 4.83762L11.655 4.59012L8.45996 7.80012L8.42996 8.89512Z' fill='currentColor' />
                      <path d='M13.56 6.23995C13.4108 6.23982 13.2678 6.18047 13.1625 6.07495L12.51 5.42995C12.4551 5.37347 12.4122 5.30649 12.3839 5.23303C12.3555 5.15957 12.3423 5.08115 12.345 5.00245C12.2661 5.00649 12.1873 4.99389 12.1136 4.96546C12.04 4.93703 11.9731 4.89342 11.9175 4.83745L11.25 4.19245C11.1446 4.08699 11.0854 3.94402 11.0854 3.79495C11.0854 3.64589 11.1446 3.50292 11.25 3.39745L13.1625 1.49995C13.2679 1.39462 13.4109 1.33545 13.56 1.33545C13.709 1.33545 13.852 1.39462 13.9575 1.49995L15.8325 3.38245C15.8855 3.43416 15.9277 3.49598 15.9565 3.56424C15.9853 3.63251 16.0001 3.70586 16.0001 3.77995C16.0001 3.85405 15.9853 3.92739 15.9565 3.99566C15.9277 4.06393 15.8855 4.12574 15.8325 4.17745L13.9575 6.07495C13.8521 6.18047 13.7091 6.23982 13.56 6.23995ZM12.9075 4.49995C12.9815 4.49828 13.0552 4.51209 13.1236 4.54051C13.1921 4.56892 13.2538 4.6113 13.305 4.66495L13.56 4.91245L14.64 3.82495L13.56 2.70745L12.465 3.79495L12.7125 4.04245C12.7684 4.09814 12.812 4.16499 12.8405 4.23864C12.8689 4.31229 12.8815 4.39111 12.8775 4.46995L12.9075 4.49995Z' fill='currentColor' />
                    </svg>
                  </button>
                </div>
                <Row className='de-mb-2 de-gx-sm align-items-center'>
                  <Col xl='3' lg='4'>
                    <span className='de-round-title'>Match #1</span>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                </Row>
                <Row className='de-mb-2 de-gx-sm align-items-center'>
                  <Col xl='3' lg='4'>
                    <span className='de-round-title'>Match #2</span>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                </Row>
                <Row className='de-mb-2 de-gx-sm align-items-center'>
                  <Col xl='3' lg='4'>
                    <span className='de-round-title'>Match #3</span>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                </Row>
                <Row className='de-mb-2 de-gx-sm align-items-center'>
                  <Col xl='3' lg='4'>
                    <span className='de-round-title'>Match #4</span>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                </Row>
                <Row className='de-mb-2 de-gx-sm align-items-center'>
                  <Col xl='3' lg='4'>
                    <span className='de-round-title'>Match #5</span>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                </Row>
                <Row className='de-mb-2 de-gx-sm align-items-center'>
                  <Col xl='3' lg='4'>
                    <span className='de-round-title'>Match #6</span>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                  <Col xl='3' lg='4'>
                    <div className='de-seed-team de-mb-0'>
                      <div className='de-seed-team-name'>TBD</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey='ranking' title='ranking (Standings)'>
              <div className='de-bracket-tab-content'>
                333
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}
