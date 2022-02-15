import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Field, useField } from 'formik';
import clsx from 'clsx';
import { LockIcon } from '@app/dekits/icons/lock-icon';
import { FormItemProps } from '../form-item.type';

interface InputProps extends FormItemProps {
  /**
   * Default: 'text'
   */
  type?: 'text' | 'number'; // For now, it only support 2 types.

  placeholder?: string;

  /** TODO: specify exact type. */
  icon?: any;

  /** Min value for input number. */
  min?: number;

  /** Max value for input number. */
  max?: number;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: InputProps) {
  const [field] = useField(props.name);
  const { onChange } = props;
  const inputType = useMemo(() => (props.type || 'text'), [props.type]);

  const handleChange = useCallback((e) => {
    field.onChange(e);
    onChange && onChange(e);
  }, [field, onChange]);

  return (
    <div
      className={clsx({
        'de-form-control-with-icon': props.icon
      })}
    >
      {props.icon && React.createElement(props.icon)}

      <input
        name={props.name}
        disabled={props.disabled}
        type={inputType}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
        className='de-form-control form-control'
        onChange={handleChange}
        onBlur={field.onBlur}
        value={field.value}
      />
    </div>
  )
}

interface InputPasswordProps extends Omit<InputProps, 'type' | 'icon'> { }

export function InputPassword(props: InputPasswordProps) {
  const [inputType, setInputType] = useState<'text' | 'password'>('password');

  const togglePassword = useCallback(() => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }, [inputType]);

  return (
    <div
      className={clsx(
        'de-password-control',
        'de-form-control-with-icon'
      )}
    >
      {React.createElement(LockIcon)}

      <Field
        name={props.name}
        disabled={props.disabled}
        type={inputType}
        placeholder={props.placeholder}
        className='de-form-control form-control'
      />

      <button
        onClick={togglePassword}
        type='button'
        className='de-toggle-password'
        tabIndex={-1}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 7.17162C14.5091 7.17162 16.5455 9.12742 16.5455 11.5372C16.5455 11.9825 16.4545 12.4104 16.3273 12.812L19.1091 15.4838C20.3727 14.4098 21.3727 13.0652 22 11.5285C20.4273 7.70423 16.5455 4.98881 12 4.98881C10.8455 4.98881 9.73636 5.16344 8.69091 5.48649L10.6636 7.38117C11.0909 7.25894 11.5364 7.17162 12 7.17162ZM3.55455 4.25539C3.2 4.59591 3.2 5.14598 3.55455 5.48649L5.34545 7.20655C3.87273 8.33288 2.7 9.81719 2 11.5372C3.57273 15.3703 7.45455 18.0857 12 18.0857C13.3818 18.0857 14.7 17.8237 15.9182 17.3697L18.3909 19.7446C18.7455 20.0851 19.3182 20.0851 19.6727 19.7446C20.0273 19.4041 20.0273 18.854 19.6727 18.5135L4.84545 4.25539C4.49091 3.91487 3.90909 3.91487 3.55455 4.25539ZM12 15.9029C9.49091 15.9029 7.45455 13.9471 7.45455 11.5372C7.45455 10.8649 7.61818 10.2276 7.9 9.66876L9.32727 11.0396C9.3 11.1967 9.27273 11.3626 9.27273 11.5372C9.27273 12.9866 10.4909 14.1566 12 14.1566C12.1818 14.1566 12.3455 14.1304 12.5182 14.0955L13.9455 15.4663C13.3545 15.7457 12.7 15.9029 12 15.9029ZM14.7 11.2491C14.5636 10.0267 13.5636 9.07503 12.3 8.94407L14.7 11.2491Z' fill='#8B5CE4' />
        </svg>
      </button>
    </div>
  )
}
