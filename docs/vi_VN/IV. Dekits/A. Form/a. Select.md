# a. Select

## 1. Live search select
```tsx
import { useCallback } from 'react';
import { map } from 'rxjs';
import { searchTeamInBracket } from '@app/api/bracket/search-team-in-bracket';
import { FormWrapper, Select, SelectOptions } from '@app/dekits/form';

function DummyForm() {
  const fetchOptions = useCallback((keyword: string) => {
    return searchTeamInBracket({
      bracket: 'BR-8616bdaa-ee37-451e-b074-5e9f10790f31',
      key_search: keyword,
    }).pipe<SelectOptions>(map(res => {
      return res.data.map(bracket => ({
        label: bracket.name,
        value: bracket._id
      }));
    }));
  }, [])

  return (
    <FormWrapper>
      <Select name='bracket' fetchOption={fetchOptions} hasSearch />
    </FormWrapper>
  );
}
```