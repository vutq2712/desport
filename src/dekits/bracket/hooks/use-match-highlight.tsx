import { useContext } from 'react';
import { matchContext } from '@app/dekits/bracket/core/match-context';

const useMatchHighlightContext = ({ bracketSnippet = null }: any) => {
  const {
    state: { hoveredPartyId },
  } = useContext(matchContext);
  const previousTopMatch = bracketSnippet?.previousTopMatch;
  const previousBottomMatch = bracketSnippet?.previousBottomMatch;
  const currentMatch = bracketSnippet?.currentMatch;

  const topHighlighted =
    currentMatch?.participants?.some(p => p.id === hoveredPartyId) &&
    previousTopMatch?.participants?.some(p => p.id === hoveredPartyId);

  const bottomHighlighted =
    currentMatch?.participants?.some(p => p.id === hoveredPartyId) &&
    previousBottomMatch?.participants?.some(p => p.id === hoveredPartyId);
  return { topHighlighted, bottomHighlighted };
};

export default useMatchHighlightContext;
