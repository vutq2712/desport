import { useFormikContext } from 'formik';
import { ErrorMessage, Select, SelectOptions } from '@app/dekits/form';
import { BracketFormValues } from '../form-config';

interface TeamFromBracketProps {
  bracketOptions: SelectOptions;
}

export function TeamFromBracket(props: TeamFromBracketProps) {
  const { values } = useFormikContext<BracketFormValues>();

  return (
    <div className='de-form-group form-group de-mb-3'>
      <label className='de-form-label form-label'>{t('tournament.apply_team_from_bracket')}</label>
      <Select name='apply_team_from_bracket' options={props.bracketOptions} disabled={!values.input_from_bracket} />
      <div className='de-form-error'>
        <ErrorMessage name='apply_team_from_bracket' />
      </div>
    </div>
  );
}
