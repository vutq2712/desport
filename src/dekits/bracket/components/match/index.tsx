import React from 'react';
// import { MatchComponentProps } from '../../types';
import {
  Score,
  Side,
  StyledMatch,
  Team,
  TopText,
  BottomText,
  Wrapper,
  Line,
  Anchor,
} from './styles';

// TODO: add exact type
function Match({
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon,
}: any) {
  const hasParticipant = match.participants[0].id || match.participants[1].id;
  const canShowDetailBtn = hasParticipant && typeof onMatchClick === 'function';

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TopText>{topText}</TopText>
        {canShowDetailBtn && (
          <Anchor onClick={() => onMatchClick?.({ match, topWon, bottomWon })}>
            <TopText>Match Details</TopText>
          </Anchor>
        )}
      </div>
      <StyledMatch>
        <Side
          onMouseEnter={() => onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          won={topWon}
          hovered={topHovered}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          <Team>{topParty?.name}</Team>
          <Score won={topWon}>{topParty?.resultText}</Score>
        </Side>
        <Line highlighted={topHovered || bottomHovered} />
        <Side
          onMouseEnter={() => onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          won={bottomWon}
          hovered={bottomHovered}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <Team>{bottomParty?.name}</Team>
          <Score won={bottomWon}>{bottomParty?.resultText}</Score>
        </Side>
      </StyledMatch>
      <BottomText>{bottomText ?? ' '}</BottomText>
    </Wrapper>
  );
}

export default Match;
