import { BracketData, getBracket } from '@app/api/bracket/get-bracket';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SingleEliminationBracket from '@app/dekits/bracket/bracket-single/single-elim-bracket'
import useWindowSize from '@app/dekits/bracket/hooks/use-window-size';
import Match from '@app/dekits/bracket/components/match';
import SvgViewer from '@app/dekits/bracket/svg-viewer';
import theme from '@app/dekits/bracket/themes/gloot-theme';
import { useCallback, useMemo } from 'react';
import { convertBracket } from '@app/services/bracket';
import { openModal } from '@app/dekits/modal';
import { ReportScoreModal } from './components/report-score-modal';
import { StartButton } from './components/start-button';
import { EndButton } from './components/end-button';
import { ResetButton } from './components/reset-button';
import { BracketStatus } from '@app/types/bracket.type';
import { useSubscription } from '@app/hooks/subscription';

const GlootTheme = theme as any;

export function BracketDetailTab() {
  const router = useRouter();
  const [bracketStatus, setBracketStatus] = useState<BracketStatus>();
  const [bracketData, setBracketData] = useState<BracketData>()
  const [matchData, setMatchData] = useState<any[]>([]);
  const subscription = useSubscription();

  const fetchBracket = useCallback(() => {
    const getBracketSub = getBracket({ bracketUUID: router.query.bracketUUID as string })
      .subscribe(res => {
        setBracketStatus(res.data.bracket.bracket.status);
        setMatchData(convertBracket(res.data))
        setBracketData(res.data);
      });

    subscription.add(getBracketSub);
  }, [subscription]);

  useEffect(() => {
    fetchBracket();
  }, [fetchBracket]);

  const bracketGraphRef = useRef<any>();
  const [_, height] = useWindowSize();
  const finalWidth = Math.max(bracketGraphRef.current?.clientWidth, 500);
  const finalHeight = Math.max(height - 100, 500);

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

  const svgWrapper = useCallback(({ children, ...props }) => (
    <SvgViewer
      background={GlootTheme.svgBackground}
      SVGBackground={GlootTheme.svgBackground}
      width={finalWidth}
      height={finalHeight}
      {...props}
    >
      {children}
    </SvgViewer>
  ), [finalWidth, finalHeight])

  const handleUpdateStatus = useCallback((newStatus: BracketStatus) => {
    setBracketStatus(newStatus);
  }, [])

  const handleMatchClick = useCallback((data) => {
    openModal(ReportScoreModal, {
      dialogClassName: 'de-modal-lg',
      data: {
        ...data,
        bracketStatus,
      },
    }).afterClosed().subscribe(fetchBracket);
  }, [bracketStatus, bracketData]);

  return (
    <div>
      <div className='d-flex'>
        <div>Status: {bracketStatus}</div>
        <StartButton disabled={bracketStatus === BracketStatus.UPCOMING} onStartSuccess={handleUpdateStatus} />
        <EndButton disabled={bracketStatus === BracketStatus.FINISHED} onEndSuccess={handleUpdateStatus} />
        <ResetButton disabled={bracketStatus !== BracketStatus.STANDBY} />
      </div>

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
  )
}
