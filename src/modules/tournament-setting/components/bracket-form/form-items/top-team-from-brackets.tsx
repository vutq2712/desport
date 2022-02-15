import { useFormikContext } from "formik";
import { Input, ErrorMessage } from '@app/dekits/form';
import { BracketFormValues } from '../form-config'

export function TopTeamFromBracket() {
  const { values } = useFormikContext<BracketFormValues>();

  return (
    <div className='de-form-group form-group de-mb-0'>
      <label className='de-form-label form-label'>{t('tournament.top_team_from_brackets')}</label>
      <Input type='number' min={1} name='top_team_from_brackets' disabled={!values.input_from_bracket} />
      <div className='de-form-error'>
        <ErrorMessage name='top_team_from_brackets' />
      </div>
    </div>
  );
}
