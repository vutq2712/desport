import { ChangeEvent, MutableRefObject, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce'
import { FormWrapper, Input, FormikProps } from '@app/dekits/form';

export interface SearchTeamFormValues {
  key_search: string;
}

interface SearchTeamFormProps {
  onSearch: (values: SearchTeamFormValues) => void;
  formRef: MutableRefObject<any>
}

export function SearchTeamForm(props: SearchTeamFormProps) {
  const initialValues = useMemo<SearchTeamFormValues>(() => ({
    key_search: '',
  }), []);

  const handleKeySearchChangeDb = useMemo(() => debounce((e: ChangeEvent<HTMLInputElement>) => {
    props.onSearch({ key_search: e.target.value })
  }, 320), []);

  useEffect(() => () => {
    handleKeySearchChangeDb.cancel();
  }, []);

  return (
    <FormWrapper<SearchTeamFormValues>
      initialValues={initialValues}
      onSubmit={props.onSearch}
      innerRef={props.formRef}
    >
      <Input name='key_search' onChange={handleKeySearchChangeDb} placeholder='search' />
    </FormWrapper>
  )
}
