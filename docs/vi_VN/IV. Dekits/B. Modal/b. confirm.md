```tsx
import { confirm } from '@app/dekits/modal'

function DummyComponent() {
  const handleX = useCallback(() => {
    confirm({ content: 'Are you sure ...?' }).subscribe(answer => {
      if (!answer) return;

      console.log('answer', answer)
    })
  }, []);

  return (
    <button onClick={handleX}>X</button>
  )
}
```