import React, { ReactElement } from 'react';
// import { Props as SVGPanZoomProps } from 'react-svg-pan-zoom';

export enum ParticipantStatus {
  PLAYED = 'PLAYED',
  NO_SHOW = 'NO_SHOW',
  WALK_OVER = 'WALK_OVER',
  NO_PARTY = 'NO_PARTY', // remove
}

export class Participant {
  id: string | undefined;

  resultText: string = '';

  isWinner: boolean = false;

  status?: ParticipantStatus = ParticipantStatus.NO_SHOW;

  /** Team name. */
  name: string | undefined;
}

export enum MatchStatus {
  WAITING = 'W',
  PROCESSING = 'P',
  COMPLETED = 'C',
  CANCALLED = 'CL',
}

export class Match<CustomData = any> {
  /** Match ID. */
  id: number | string = '';

  /** You can add custom data with this prop. */
  customData: CustomData = {} as CustomData;

  /** Match name => remove ??? */
  name?: string = '';

  nextMatchId?: string = '';

  nextLooserMatchId?: number = 0; // ???

  tournamentRoundText: string = '';

  startTime: string = '';

  state: MatchStatus = MatchStatus.WAITING;

  participants: Participant[] = [];
}

export class Options {
  width?: number = 0;

  boxHeight?: number = 0;

  canvasPadding?: number = 0;

  spaceBetweenColumns?: number = 0;

  spaceBetweenRows?: number = 0;

  connectorColor?: string = '';

  connectorColorHighlight?: string = '';

  roundHeader?: {
    isShown?: boolean;
    height?: number;
    marginBottom?: number;
    fontSize?: number;
    fontColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };

  roundSeparatorWidth?: number = 0;

  lineInfo?: {
    separation: number;
    homeVisitorSpread: number;
  };

  horizontalOffset?: number = 0;

  wonBywalkOverText?: string = '';

  lostByNoShowText?: string = '';
}

export class ComputedOptions extends Options {
  rowHeight: number = 0;

  columnWidth: number = 0;
}

export class SvgViewerProps {
  height: number = 0;

  width: number = 0;

  bracketWidth: number = 0;

  bracketHeight: number = 0;

  children?: ReactElement;

  startAt?: number[];

  scaleFactor: number = 0;
}

export class MatchComponentProps {
  match?: Match;

  onMatchClick?: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
  }) => void;

  onPartyClick?: (party: Participant, partyWon: boolean) => void;

  onMouseEnter?: (partyId: string | number) => void;

  onMouseLeave?: () => void;

  topParty?: Participant;

  bottomParty?: Participant;

  topWon?: boolean;

  bottomWon?: boolean;

  topHovered?: boolean;

  bottomHovered?: boolean;

  topText: string = '';

  bottomText: string = '';

  connectorColor: string = '';

  computedStyles?: ComputedOptions;

  teamNameFallback: string = '';

  resultFallback?: (participant: Participant) => string;
}
export class Theme {
  fontFamily: string = '';

  transitionTimingFunction: string = '';

  disabledColor: string = '';

  matchBackground?: {
    wonColor: string;
    lostColor: string;
  };

  border?: {
    color: string;
    highlightedColor: string;
  };

  textColor?: {
    highlighted: string;
    main: string;
    dark: string;
    disabled: string;
  };

  score?: {
    text: {
      highlightedWonColor: string;
      highlightedLostColor: string;
    };
    background: {
      wonColor: string;
      lostColor: string;
    };
  };

  canvasBackground: string = '';
}

export class BracketLeaderboardProps {
  matchComponent?: (props: MatchComponentProps) => JSX.Element;

  currentRound?: string = '';

  onClickEditRound?: (roundIndex: number) => void;

  onMatchClick?: (args: {
    match?: Match;
    topWon?: boolean;
    bottomWon?: boolean;
  }) => void;

  onPartyClick?: (party: Participant, partyWon: boolean) => void;

  svgWrapper?: (props: {
    bracketWidth: number;
    bracketHeight: number;
    startAt: number[];
    children: ReactElement;
  }) => React.ReactElement;

  theme?: Theme;

  options?: { style?: Options };
}

export class SingleElimLeaderboardProps extends BracketLeaderboardProps {
  matches?: any[];
}
export class DoubleElimLeaderboardProps extends BracketLeaderboardProps {
  matches?: { upper: Match[]; lower: Match[] };
}
