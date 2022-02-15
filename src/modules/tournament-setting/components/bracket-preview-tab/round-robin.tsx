import { SimpleNotice } from "@app/dekits/components/simple-notice";
import Link from "next/link";
import { Col, Row, Tab, Tabs } from 'react-bootstrap';

export function BracketRoundRobin({ bracketSeedingHref, editBracketHref }) {
  return (
    <>
      <div className='de-ts-bracket-preview-header de-mb-1'>
        <h4>Round Robin</h4>
        <div>
          <Link href={bracketSeedingHref}>
            <button type='submit' className='de-btn de-btn-outline-primary de-me-1'>Seeding</button>
          </Link>

          <Link href={editBracketHref}>
            <button type='submit' className='de-btn de-btn-outline-primary'>Edit setting</button>
          </Link>
        </div>
      </div>
      <SimpleNotice message='Top 8 teams will be advanced to Playoffs.' />

      <div className='de-ts-brackets-tab'>
        <div className='de-bracket-preview-tab'>
          <Tabs className='de-bracket-preview-tabs' defaultActiveKey='matches' id='bracket-preview-tab'>
            <Tab eventKey='matches' title='Matches'>
              <div className='de-bracket-tab-content'>
                <div className='de-mb-3'>
                  <span className='de-round-title'>Rounds:</span>
                  <button type='button' className='de-ts-cat-tab de-round-number active'><span>1</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>2</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>3</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>4</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>5</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>6</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>7</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>8</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>9</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>10</span></button>
                </div>

                <div className='de-mb-3 d-flex align-items-center'>
                  <h4 className='de-round-name'>Round 1 - Best of 3</h4>
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

                <div className='de-mb-3 d-flex align-items-center'>
                  <h4 className='de-round-name'>3-0 Group</h4>
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

                <div className='de-mb-3 d-flex align-items-center'>
                  <h4 className='de-round-name'>1-1 Group</h4>
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

                <div className='de-mb-3 d-flex align-items-center'>
                  <h4 className='de-round-name'>0-3 Group</h4>
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
