import clsx from 'clsx';
import { Icon } from '@app/dekits/icon'
import type { AvailableIcons } from '@app/dekits/icon'

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

interface ButtonProps {
  onClick?: (e: ButtonClickEvent) => void;

  children?: any;

  /**
   * Default: 'button'.
   */
  type?: 'button' | 'submit' | 'reset';

  className?: string;

  disabled?: boolean;

  suffixIcon?: AvailableIcons;

  /** Default: 18. */
  suffixIconWidth?: number;

  /** Default: 18. */
  suffixIconHeight?: number;
}

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      type={props.type || 'button'}
      className={clsx('de-btn', props.className)}
      onClick={props.onClick}
    >
      {props.children}

      {props.suffixIcon && <Icon
        name={props.suffixIcon}
        width={props.suffixIconWidth || 18}
        height={props.suffixIconHeight || 18}
      />}
    </button>
  )
}
