import React from 'react';
import { Field } from 'formik';
import { FormItemProps } from '../form-item.type';

interface CheckboxProps extends FormItemProps {
  value: string;
}

export function Checkbox(props: CheckboxProps) {
  return <Field {...props} type='checkbox' />
}
