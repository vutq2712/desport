import { Tab, Tabs } from "react-bootstrap";
import { BracketInfo } from "./bracket";
import { MatchesList } from "./matches";
import { StandingInfo } from "./standing";

interface BracketDetailProps {
  tournament_name: string;
  bracket_id: string;
}

export function BracketDetail(props: BracketDetailProps) {
  return (
    <div className='de-bracket-detail-tab'>
      <Tabs className='de-bracket-detail-tabs' defaultActiveKey='bracket' id='bracket-detail-tab'>
        <Tab eventKey='bracket' title='Bracket'>
          <BracketInfo bracketId={props.bracket_id} />
        </Tab>
        <Tab eventKey='matches' title='Matches'>
          <MatchesList tournament_name={props.tournament_name} bracket_id={props.bracket_id} />
        </Tab>
        <Tab eventKey='standing' title='Standing'>
          <StandingInfo />
        </Tab>
      </Tabs>
    </div>
  )
}
