import { BracketCard } from "@app/dekits/components/bracket-card";
import { BracketData, listBracket } from "@app/api/bracket/list-bracket"

interface BracketsOverviewProps {
  brackets: BracketData[];
  onClickView?: (bracketId: string) => void;
}

export function BracketsOverview(props: BracketsOverviewProps) {
  return (
    <div className='de-brackets-overview'>
      {props.brackets.map((bracket, idx) => (
        <BracketCard
          key={bracket._id}
          bracket={bracket}
          collapsed={idx !== 0}
          onClickView={props.onClickView}
        />
      ))}
    </div>
  )
}
