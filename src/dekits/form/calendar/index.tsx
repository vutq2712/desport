import React from 'react';
import { ReactDatePicker } from 'react-datepicker';
import { useField } from 'formik';
import { FormItemProps } from '../form-item.type';

interface CalendarProps extends FormItemProps { }

export function Calendar(props: CalendarProps) {
  const [field] = useField({ name: props.name });

  return (
    <ReactDatePicker onChange={field.onChange} onBlur={field.onBlur} />
  )
}
