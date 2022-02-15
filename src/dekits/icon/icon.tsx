import { AvailableIcons, icons } from './resources';

interface IconProps {
  /** Icon name. */
  name: AvailableIcons;

  width: number;

  height: number;
}

export function Icon(props: IconProps) {
  const { width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {icons[props.name]}
    </svg>
  );
}
