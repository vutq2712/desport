import { SelectOptions, SchemaOf, Yup } from '@app/dekits/form';
import { BracketFormat } from '@app/types/bracket.type';
import { TFunction } from 'next-i18next';

export interface BracketFormValues {
  mode: string;
  tournament: string;
  name: string;
  format: string,
  enable_3rd_vs_4th: boolean;
  start_date: any;
  game_per_round: number;
  final_round: number;
  team_limit: boolean;
  max_teams: number;
  input_from_bracket: boolean;
  apply_team_from_bracket?: string;
  top_team_from_brackets?: number;
}

export function getValidationSchema() {
  const validationSchema: SchemaOf<BracketFormValues> = Yup.object({
    mode: Yup.string().required(t('form.required')),
    tournament: Yup.string().required(t('form.required')),
    name: Yup.string().required(t('form.required')),
    format: Yup.string().required(t('form.required')),
    enable_3rd_vs_4th: Yup.boolean().required(),
    start_date: Yup.string().nullable().required(t('form.required')),
    game_per_round: Yup.number()
      .typeError(t('form.number_type'))
      .min(1, t('form.number_min', { min: 1 }))
      .required(t('form.required')),
    final_round: Yup.number()
      .typeError(t('form.number_type'))
      .min(1, t('form.number_min', { min: 1 }))
      .required(t('form.required')),
    team_limit: Yup.boolean().required(),
    max_teams: Yup.number()
      .typeError(t('form.number_type'))
      .required(t('form.required')),
    input_from_bracket: Yup.boolean().required(),
    apply_team_from_bracket: Yup.string()
      .when('input_from_bracket', {
        is: true,
        then: schema => schema.required(t('form.required')),
      }),
    top_team_from_brackets: Yup.number()
      .typeError(t('form.number_type'))
      .when('input_from_bracket', {
        is: true,
        then: schema => schema.required(t('form.required')),
      }),
  });

  return validationSchema;
}

export function getFormatOptions() {
  const formatOptions: SelectOptions = [
    { label: t('tournament.format.single_elimination'), value: BracketFormat.SINGLE_ELIMINATION },
    { label: 'Swiss', value: BracketFormat.SWISS },
    { label: 'Round Robin', value: BracketFormat.ROUND_ROBIN },
    { label: 'Battle Royal', value: BracketFormat.BATTLE_ROYAL }
  ];

  return formatOptions;
}

/**
 * Get initial values when **creating new bracket**.
 */
export function getInitialValues(tournamentId: string) {
  const initialValues: BracketFormValues = {
    mode: 'SE',
    tournament: tournamentId,
    name: '',
    format: BracketFormat.SINGLE_ELIMINATION,
    enable_3rd_vs_4th: false,
    start_date: '',
    game_per_round: 0,
    final_round: 0,
    team_limit: true,
    max_teams: 0,
    input_from_bracket: false,
    apply_team_from_bracket: '',
    top_team_from_brackets: 0,
  };

  return initialValues;
}
