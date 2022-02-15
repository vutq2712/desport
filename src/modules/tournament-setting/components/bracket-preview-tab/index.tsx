import { getBracket } from '@app/api/bracket/get-bracket';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SingleEliminationBracket from '@app/dekits/bracket/bracket-single/single-elim-bracket'
import useWindowSize from '@app/dekits/bracket/hooks/use-window-size';
import Match from '@app/dekits/bracket/components/match';
import SvgViewer from '@app/dekits/bracket/svg-viewer';
import theme from '@app/dekits/bracket/themes/gloot-theme';
import { useCallback, useMemo } from 'react';
import { convertBracket } from '@app/services/bracket';
import { TournamentTabKeys } from '../../services/sidebar';
import Link from 'next/link';
import { BracketSingleElimination } from './single-elimination';
import { BracketSwissTournament } from './swiss-tournament';
import { BracketRoundRobin } from './round-robin';
import { BracketSeedBracket } from './seed-bracket';
import { BracketBattleRoyal } from './battle-royal';
import { Icon } from '@app/dekits/icon';

const GlootTheme = theme as any;

export function BracketPreviewTab() {
  const router = useRouter();
  const [matchData, setMatchData] = useState<any[]>([]);

  useEffect(() => {
    const getBracketSub = getBracket({ bracketUUID: router.query.bracketUUID as string })
      .subscribe(res => {
        setMatchData(convertBracket(res.data))

      })
  }, []);

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

  const { tournamentId, bracketUUID } = router.query;
  const bracketSeedingHref =
    `/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.BRACKET_SEEDING}&bracketUUID=${bracketUUID}`;

  const editBracketHref =
    `/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.BRACKET_EDIT}&bracketUUID=${bracketUUID}`;


  return (
    <div className='de-ts-bracket-preview'>
      <div className='de-ts-bracket-preview-top de-mb-3'>
        <div>
          <button type='button' className='de-ts-cat-tab active'>
            <span>Overview</span>
          </button>
          <button type='button' className='de-ts-cat-tab'>
            <span>Open Qualifier</span>
          </button>
          <button type='button' className='de-ts-cat-tab'>
            <span>Closed Qualifier</span>
          </button>
          <button type='button' className='de-ts-cat-tab'>
            <span>Playoffs</span>
          </button>
        </div>
        <Link href={`/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.CREATE_BRACKET}`}>
          <a className='de-btn de-btn-sm de-btn-secondary' type='button'>
            <span>New bracket</span>
            <Icon name='add-new' width={18} height={18} />
          </a>
        </Link>
      </div>

      <BracketSingleElimination bracketSeedingHref={bracketSeedingHref} editBracketHref={editBracketHref} />
      {/* <BracketSwissTournament bracketSeedingHref={bracketSeedingHref} editBracketHref={editBracketHref} /> */}
      {/* <BracketRoundRobin bracketSeedingHref={bracketSeedingHref} editBracketHref={editBracketHref} /> */}
      {/* <BracketBattleRoyal bracketSeedingHref={bracketSeedingHref} editBracketHref={editBracketHref} /> */}
      {/* <BracketSeedBracket/> */}

      <div ref={bracketGraphRef}>
        {matchData.length > 0 && <SingleEliminationBracket
          matches={matchData}
          matchComponent={Match}
          theme={GlootTheme}
          options={options}
          svgWrapper={svgWrapper}
        />}
      </div>
    </div>
  )
}
