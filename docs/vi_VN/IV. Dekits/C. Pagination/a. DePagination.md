# a. DePagination

```tsx
import { DePagination, PageChangeData } from '@app/dekits/pagination';

export function SampleComponent() {
  const handlePageChange = useCallback((data: PageChangeData) => {
    //
  }, [])

  return (
    <DePagination
      currentPage={1}
      totalItems={301}
      pageSize={20}
      onPageChange={handlePageChange}
    />
  )
}
```