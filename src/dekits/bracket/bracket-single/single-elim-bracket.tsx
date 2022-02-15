import React from 'react';
import { ThemeProvider } from 'styled-components';
import { sortAlphanumerically } from '@app/dekits/bracket/utils/string';
import { calculateSVGDimensions } from '@app/dekits/bracket/core/calculate-svg-dimensions';
import { MatchContextProvider } from '@app/dekits/bracket/core/match-context';
import MatchWrapper from '@app/dekits/bracket/core/match-wrapper';
import RoundHeader from '@app/dekits/bracket/components/round-header';
import { getPreviousMatches } from '@app/dekits/bracket/core/match-functions';
import { SingleElimLeaderboardProps } from '../types';
import { defaultStyle, getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from './calculate-match-position';

import Connectors from './connectors';
import defaultTheme from '../themes/themes';

const SingleEliminationBracket = ({
  matches = [],
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  onClickEditRound,
  options: { style: inputStyle } = {
    style: defaultStyle,
  } as any,
}: SingleElimLeaderboardProps) => {
  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...inputStyle?.roundHeader,
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...inputStyle?.lineInfo,
    },
  };

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    getCalculatedStyles(style);

  const lastGame = matches.find(match => !match.nextMatchId);
  const thirdPlaceMatch = matches.find((match, idx) => !match.nextMatchId && idx === 1);

  const generateColumn = matchesColumn => {
    const previousMatchesColumn = matchesColumn.reduce((result, match) => {
      return [
        ...result,
        ...matches
          .filter(m => m.nextMatchId === match.id)
          .sort((a, b) => sortAlphanumerically(a.name, b.name)),
      ];
    }, []);

    if (previousMatchesColumn.length > 0) {
      return [...generateColumn(previousMatchesColumn), previousMatchesColumn];
    }
    return [previousMatchesColumn];
  };
  const generate2DBracketArray = final => {
    return final
      ? [...generateColumn([final]), [final]].filter(arr => arr.length > 0)
      : [];
  };
  const columns = generate2DBracketArray(lastGame);
  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]

  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    columns[0].length,
    columns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  const numOfRounds = columns.length;

  return (
    <ThemeProvider theme={theme}>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={gameHeight}
        startAt={startPosition}
      >
        <svg
          height={gameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${gameHeight}`}
        >
          <MatchContextProvider>
            <g>
              {columns.map((matchesColumn, columnIndex) =>
                matchesColumn.map((match, rowIndex) => {
                  const { x, y } = calculatePositionOfMatch(
                    rowIndex,
                    columnIndex,
                    {
                      canvasPadding,
                      columnWidth,
                      rowHeight,
                    }
                  );
                  const previousBottomPosition = (rowIndex + 1) * 2 - 1;

                  const { previousTopMatch, previousBottomMatch } =
                    getPreviousMatches(
                      columnIndex,
                      columns,
                      previousBottomPosition
                    );

                  return (
                    <React.Fragment key={rowIndex}>
                      {roundHeader.isShown && (
                        <RoundHeader
                          x={x}
                          roundHeader={roundHeader}
                          canvasPadding={canvasPadding}
                          width={width}
                          numOfRounds={numOfRounds}
                          tournamentRoundText={match.tournamentRoundText}
                          columnIndex={columnIndex}
                          onClickEditRound={onClickEditRound}
                        />
                      )}

                      {columnIndex !== 0 && (
                        <Connectors
                          {...{
                            bracketSnippet: {
                              currentMatch: match,
                              previousTopMatch,
                              previousBottomMatch,
                            },
                            rowIndex,
                            columnIndex,
                            gameHeight,
                            gameWidth,
                            style,
                          }}
                        />
                      )}

                      <g>
                        <MatchWrapper
                          x={x}
                          y={
                            y +
                            (roundHeader.isShown
                              ? roundHeader.height + roundHeader.marginBottom
                              : 0)
                          }
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                          match={match}
                          previousBottomMatch={previousBottomMatch}
                          topText={match.startTime}
                          bottomText={match.name}
                          teams={match.participants}
                          onMatchClick={onMatchClick}
                          onPartyClick={onPartyClick}
                          style={style}
                          matchComponent={matchComponent}
                        />
                      </g>

                      {thirdPlaceMatch && numOfRounds === columnIndex + 1 && (
                        <g>
                          <MatchWrapper
                            x={x}
                            y={
                              y +
                              (roundHeader.isShown
                                ? roundHeader.height + roundHeader.marginBottom
                                : 0) + 125
                            }
                            rowIndex={rowIndex}
                            columnIndex={columnIndex}
                            match={thirdPlaceMatch}
                            topText={thirdPlaceMatch.startTime}
                            bottomText={thirdPlaceMatch.name}
                            teams={thirdPlaceMatch.participants}
                            onMatchClick={onMatchClick}
                            onPartyClick={onPartyClick}
                            style={style}
                            matchComponent={matchComponent}
                          />
                        </g>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </g>
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default SingleEliminationBracket;
