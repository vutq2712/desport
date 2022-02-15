import { BracketData, getBracket } from '@app/api/bracket/get-bracket';
import { useSubscription } from "@app/hooks/subscription"
import { BracketStatus } from '@app/types/bracket.type';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { convertBracket } from '@app/services/bracket';
import useWindowSize from '@app/dekits/bracket/hooks/use-window-size';
import SingleEliminationBracket from '@app/dekits/bracket/bracket-single/single-elim-bracket'
import Match from '@app/dekits/bracket/components/match';
import theme from '@app/dekits/bracket/themes/gloot-theme';

const GlootTheme = theme as any;

interface BracketProps {
  bracketId: string;
}

export function BracketInfo(props: BracketProps) {
  const subscription = useSubscription();
  const [bracketStatus, setBracketStatus] = useState<BracketStatus>();
  const [bracketData, setBracketData] = useState<BracketData>()
  const [matchData, setMatchData] = useState<any[]>([]);

  useEffect(() => {
    const getBracketSub = getBracket({ bracketUUID: props.bracketId })
      .subscribe(res => {
        setBracketStatus(res.data.bracket.bracket.status);
        setMatchData(convertBracket(res.data))
        setBracketData(res.data);
      });

    subscription.add(getBracketSub);
  }, [props.bracketId])

  const bracketGraphRef = useRef<any>();
  const [_, height] = useWindowSize();
  const finalWidth = Math.max(bracketGraphRef.current?.clientWidth, 500);
  const finalHeight = Math.max(height - 100, 500);

  const svgWrapper = useCallback(({ children }) => (
    children
  ), [finalWidth, finalHeight]);

  const options = useMemo(() => ({
    style: {
      roundHeader: {
        backgroundColor: GlootTheme.roundHeader.backgroundColor,
        fontColor: GlootTheme.roundHeader.fontColor,
      },
      connectorColor: GlootTheme.connectorColor,
      connectorColorHighlight: GlootTheme.connectorColorHighlight,
    },
  }), [])

  const handleMatchClick = useCallback((data) => {
    // openModal(ReportScoreModal, {
    //   dialogClassName: 'de-modal-lg',
    //   data: {
    //     ...data,
    //     bracketStatus,
    //   },
    // }).afterClosed().subscribe(fetchBracket);
  }, [bracketStatus, bracketData]);

  return (
    <div className='de-bracket-tab-content'>
      <div className='de-bracket-info'>

        <div ref={bracketGraphRef}>
          {matchData.length > 0 && <SingleEliminationBracket
            matches={matchData}
            matchComponent={Match}
            theme={GlootTheme}
            options={options}
            svgWrapper={svgWrapper}
            onMatchClick={handleMatchClick}
          />}
        </div>
      </div>
    </div>
  )
}
