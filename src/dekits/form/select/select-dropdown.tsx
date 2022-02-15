import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce'
import type { SelectOptions } from './select';

interface SelectDropdownProps {
  parentRef: React.RefObject<HTMLDivElement>;
  options: SelectOptions;
  hasSearch?: boolean;
  hasIcon?: boolean;
  onItemSelect: (value) => void;
  onSearch?: (query: string) => void;
}

export function SelectDropdown(props: SelectDropdownProps) {
  const { options, onItemSelect, onSearch } = props;
  const handleSelectItem = useCallback((value) => () => {
    onItemSelect(value);
  }, [onItemSelect]);

  const handleKeySearchChangeDebounce = useMemo(() => debounce((e: ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(e.target.value)
  }, 300), []);

  useEffect(() => () => {
    handleKeySearchChangeDebounce.cancel();
  }, [handleKeySearchChangeDebounce]);

  return (
    <div className='select-dropdown'>
      {props.hasSearch && <input onChange={handleKeySearchChangeDebounce} />}

      <ul className='select-list'>
        {options.map((opt, idx) => (
          <li
            key={idx}
            onClick={handleSelectItem(opt.value)}
            className='select-item'
          >
            {(props.hasIcon && !!opt?.icon) && <img src={opt.icon} alt={opt.label} height={20} width={20} style={{marginRight: '6px'}} />}

            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
