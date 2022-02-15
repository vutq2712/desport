import React from 'react';
import { Field } from 'formik';
import { FormItemProps } from '../form-item.type';

interface RadioProps extends FormItemProps {
  value: string | number;
}

export function Radio(props: RadioProps) {
  return <Field {...props} type='radio' />
}
