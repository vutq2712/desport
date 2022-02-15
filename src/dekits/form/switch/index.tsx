import React, { useCallback } from 'react';
import { useField } from 'formik';
import { FormItemProps } from '../form-item.type';

interface SwitchProps extends FormItemProps {
  onChange?: (data: boolean) => void;
}

export function Switch(props: SwitchProps) {
  const { onChange } = props;
  const [field, _, fieldHelper] = useField<boolean>(props.name);

  const handleChange = useCallback(() => {
    const newValue = !field.value;

    fieldHelper.setTouched(true);
    fieldHelper.setValue(newValue);
    onChange && onChange(newValue);
  }, [onChange, field, fieldHelper]);

  return <button className={`de-switch ${field.value ? 'checked' : ''}`} disabled={props.disabled} type='button' onClick={handleChange}>
    <span></span>
  </button>
}
