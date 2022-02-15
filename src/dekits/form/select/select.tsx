import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { FormItemProps } from '../form-item.type';
import { Observable } from 'rxjs';
import { SelectDropdown } from './select-dropdown';
import { useSubscription } from '@app/hooks/subscription';
import { BooleanLocale } from 'yup/lib/locale';

type SelectOption = { label: string, value: string, icon?: string };

export type SelectOptions = SelectOption[];

interface SelectProps extends FormItemProps {
  /**
   * Default: []
   */
  options?: SelectOptions;

  onChange?: (data: string) => void;

  /**
   * - true: show input search.
   * - false: hide input search.
   *
   * Default: false.
   */
  hasSearch?: boolean;

  /**
   * This callback must return RxJS observable to get data.
   */
  fetchOption?: (query: string) => Observable<SelectOptions>;

  placeholder?: string;

  hasIcon?: boolean;
}

function useOuterClick(callback) {
  const callbackRef = useRef<any>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<any>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => { callbackRef.current = callback; });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (innerRef.current && callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}

export function Select({
  onChange,
  name,
  options,
  disabled,
  fetchOption,
  placeholder,
  hasSearch,
  hasIcon,
}: SelectProps) {
  const subscription = useSubscription();
  const [selectedOption, setSelectedOption] = useState<SelectOption>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [field, _, helper] = useField(name);
  const [inUsedOptions, setInUsedOptions] = useState([
    { label: '', value: '' },
    ...options || [],
  ]);

  const openSelectBox = useCallback(() => {
    setIsDropdownOpen(true);
  }, []);

  const closeSelectBox = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const selectRef = useOuterClick(() => {
    closeSelectBox();
  });

  const handleItemSelect = useCallback((value) => {
    closeSelectBox();
    helper.setTouched(true);
    helper.setValue(value);
    onChange && onChange(value);
  }, [helper, onChange, closeSelectBox]);

  useEffect(() => {
    if (!fetchOption) return;

    const fetchOptionSub = fetchOption('').subscribe(opts => {
      setInUsedOptions(opts);
    });

    subscription.add(fetchOptionSub);
  }, [fetchOption, subscription]);

  const handleSelectSearch = useCallback((query: string) => {
    if (!fetchOption) return;

    const fetchOptionSub = fetchOption(query).subscribe(opts => {
      setInUsedOptions(opts);
    });

    subscription.add(fetchOptionSub);
  }, [fetchOption, subscription])

  useEffect(() => {
    if (!options) return;

    setInUsedOptions(options);
  }, [options])

  // sync data from formik
  useEffect(() => {
    const selectedOption = inUsedOptions.find(opt => opt.value === field.value);
    if (!selectedOption) return;

    setSelectedOption(selectedOption);
  }, [field.value, inUsedOptions]);

  return (
    <div
      ref={selectRef}
      className='de-form-select-wrapper'
    >
      <button
        type='button'
        onClick={openSelectBox}
        disabled={disabled}
        className='de-form-control form-select'
      >
        {(hasIcon && !!selectedOption?.icon) && <img src={selectedOption.icon} alt={selectedOption.label} height={20} width={20} style={{marginRight: '6px'}} />}
        {selectedOption?.label || placeholder}
      </button>

      {isDropdownOpen && (
        <SelectDropdown
          hasIcon={hasIcon}
          hasSearch={hasSearch}
          onItemSelect={handleItemSelect}
          onSearch={handleSelectSearch}
          options={inUsedOptions}
          parentRef={selectRef}
        />
      )}
    </div>
  )
}
