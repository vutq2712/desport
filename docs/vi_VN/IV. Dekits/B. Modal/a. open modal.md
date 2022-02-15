# a. Open Modal
Để mở một modal với react, code thông thường sẽ có dạng như sau:

```tsx
function Yo() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleModal}>open</button>

      {isOpen && <div>modal x</div>}
    </>
  )
}
```

Vấn đề:
- z-index của modal bị ảnh hưởng bởi parent component.
- với cách làm này, dev **rất dễ** có xu hướng viết nơi cài đặt và nơi sử dụng modal vào chung một nơi như trên dẫn đến khả năng tái sử dụng kém.
- parent component phải control open state của modal. Trong thực tế, một page có thể có nhiều modal, nếu parent page control open state thì có thể bạn sẽ gặp 1 loại cái tên như `isOpenX`, `isOpenY`, `toggleModalX`, `toggleModalY`, ......................
- cách mở modal không "tập trung", khó thực hiện điều chỉnh cho toàn bộ modal một lúc.
- template sẽ bị dài, ở ví dụ trên chỉ có 1 dòng, những nếu có 10 modal thì template sẽ cần 10 dòng như vậy.
- nơi thực hiện call open modal kém linh hoạt(do bị ảnh hưởng của z-index, state,...);

Giải pháp: sử dụng `openModal`

```tsx
import { openModal, ModalProps } from '@app/dekits/modal';

function ModalX(props: ModalProps) {
  return (<div>modal x</div>)
} 

function Yo() {
  const openModalX = useCallback(() => {
    openModal(ModalX);
  }, [isOpen]);

  return (
    <>
      <button onClick={openModalX}>open</button>
    </>
  )
}
```