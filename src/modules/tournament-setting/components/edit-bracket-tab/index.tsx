import { editBracket } from '@app/api/bracket/edit-bracket';
import { getBracket } from '@app/api/bracket/get-bracket';
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react';
import { TournamentTabKeys } from '../../services/sidebar';
import { BracketForm, BracketFormValues } from '../bracket-form'
import { useSubscription } from '@app/hooks/subscription';
;
export function EditBracketTab() {
  const router = useRouter();
  const [initialFormValues, setInitialFormValues] = useState<BracketFormValues>();
  const subscription = useSubscription();

  useEffect(() => {
    const bracketUUID = router.query.bracketUUID as string;
    const tournamentUUID = router.query.tournamentId as string;

    const getBracketSub = getBracket({ bracketUUID }).subscribe({
      next: (res) => {
        const bracket = res.data.bracket.bracket;
        const bracketMode = res.data.bracketMode;
        const initialFormValues: BracketFormValues = {
          enable_3rd_vs_4th: bracketMode.data.enable_3rd_vs_4th,
          final_round: bracket.rounds.length,
          format: bracket.format,
          game_per_round: bracketMode.data.game_per_round,
          input_from_bracket: bracket.input_from_bracket.isEnable,
          max_teams: bracket.max_teams,
          mode: bracket.mode,
          name: bracket.name,
          start_date: bracket.start_date,
          team_limit: bracket.team_limit,
          tournament: tournamentUUID,
          apply_team_from_bracket: '',
          top_team_from_brackets: bracket.top_team_from_brackets,
        };

        setInitialFormValues(initialFormValues);
      },
      error: () => { },
    });

    subscription.add(getBracketSub);
  }, []);

  const handleEditBracket = useCallback((values: BracketFormValues) => {
    const bracketUUID = router.query.bracketUUID as string;
    const editBracketSub = editBracket({
      ...values,
      bracket: bracketUUID,
    }).subscribe({
      next: () => {
        const tournamentId = router.query.tournamentId;
        const bracketPreviewHref =
          `/tournament-setting/${tournamentId}?tab=${TournamentTabKeys.BRACKET_PREVIEW}&bracketUUID=${bracketUUID}`;

        router.push(bracketPreviewHref);
      }
    });

    subscription.add(editBracketSub);
  }, [])

  return (
    <div>
      {initialFormValues && (
        <BracketForm
          initialFormValues={initialFormValues}
          onSubmit={handleEditBracket}
        />
      )}
    </div>
  )
}
