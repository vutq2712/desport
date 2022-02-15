import { useCallback } from "react";
import { useFormikContext } from "formik";
import { Switch } from '@app/dekits/form';
import { BracketFormValues } from '../form-config'
import { BracketData } from "@app/api/bracket/list-bracket";

interface InputFromBracketProps {
  availableBrackets: BracketData[];
}

export function InputFromBracket(props: InputFromBracketProps) {
  const formik = useFormikContext<BracketFormValues>();

  const handleInputFromBracketChange = useCallback(() => {
    formik.setFieldValue('apply_team_from_bracket', '');
    formik.setFieldTouched('apply_team_from_bracket', false);
    formik.setFieldValue('top_team_from_brackets', '');
    formik.setFieldTouched('top_team_from_brackets', false);
  }, [formik]);

  return (
    <div className='de-form-group form-group d-flex align-items-center'>
      <label className='de-me-2'>{t('tournament.input_from_bracket')}</label>
      <Switch
        name='input_from_bracket'
        onChange={handleInputFromBracketChange}
        disabled={props.availableBrackets.length === 0}
      />
    </div>
  );
}
