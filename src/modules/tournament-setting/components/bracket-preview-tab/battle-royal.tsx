import Link from "next/link";
import { Col, Row, Tab, Tabs } from 'react-bootstrap';

export function BracketBattleRoyal({ bracketSeedingHref, editBracketHref }) {
  return (
    <>
      <div className='de-ts-bracket-preview-header de-mb-3'>
        <h4>Battle Royal</h4>
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
                  <button type='button' className='de-ts-cat-tab de-round-number active'><span>Week 1</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>Weekend 1</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>Week 2</span></button>
                  <button type='button' className='de-ts-cat-tab de-round-number'><span>Weekend 2</span></button>
                </div>

                <div className='de-mb-3 d-flex align-items-center'>
                  <h4 className='de-round-name'>Week 1</h4>
                </div>
              </div>
            </Tab>
            <Tab eventKey='ranking' title='ranking (Standings)'>
              <div className='de-bracket-tab-content'>
                333
              </div>
            </Tab>
            <Tab eventKey='groups' title='groups'>
              <div className='de-bracket-tab-content'>
                444
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}
