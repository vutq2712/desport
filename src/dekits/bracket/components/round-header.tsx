import React, { useCallback } from 'react';

// dummy
const roundStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '3px',
}

interface RoundHeaderProps {
  x: number;
  y?: number;
  width: number;
  roundHeader?: any;
  canvasPadding?: any;
  numOfRounds: number;
  tournamentRoundText: string | number;
  columnIndex: number;
  onClickEditRound?: (columnIdx: number) => void;
}

export default function RoundHeader({
  x,
  y = 0,
  width,
  roundHeader,
  canvasPadding,
  numOfRounds,
  tournamentRoundText,
  columnIndex,
  onClickEditRound,
}: RoundHeaderProps) {
  const handleClickRoundEdit = useCallback(() => {
    onClickEditRound && onClickEditRound(columnIndex);
  }, []);

  return (
    <g>
      <foreignObject x={x} y={y + canvasPadding} width={width} height={roundHeader.height}>
        <div style={{
          ...roundStyle,
          background: roundHeader.backgroundColor,
          height: roundHeader.height,
          fontSize: `${roundHeader.fontSize}px`,
          color: roundHeader.fontColor,
        }}>
          {columnIndex + 1 === numOfRounds && 'Final'}
          {columnIndex + 1 === numOfRounds - 1 && 'Semi-final'}
          {columnIndex + 1 < numOfRounds - 1 && `Round ${tournamentRoundText}`}
          &nbsp;&nbsp;

          {onClickEditRound && <button type='button' onClick={handleClickRoundEdit}>edit</button>}
        </div>
      </foreignObject>
    </g>
  );
}
