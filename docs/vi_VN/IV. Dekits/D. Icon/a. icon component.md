# a. Icon component
## 1. Đặc điểm của các icons:
- kích thước từng icon nhỏ.
- ước lượng cả app sẽ có khoảng 100 -> 200 icons.

=> tổng dung lượng không đáng kể, có thể đặt chung vào một file để sử dụng.

_(Nếu những đặc điểm này thay đổi thì cần đặt icon vào file riêng và sử dụng request để lấy content của icon)_

## 2. resources.ts
`resources.ts` là file đặt những icon sẵn có của app.

Ví dụ: thêm một icon có tên là `icon-x` vào file `src/dekits/icon/resources.ts`
```tsx
export const icons {
  ...
  'icon-x': <>
    <path d='M9 12.3674C8.85082 12.3674 8.70774 12.3082 8.60225 12.2027C8.49676 12.0972 8.4375 11.9541 8.4375 11.8049V5.80493C8.4375 5.65575 8.49676 5.51267 8.60225 5.40718C8.70774 5.3017 8.85082 5.24243 9 5.24243C9.14918 5.24243 9.29226 5.3017 9.39775 5.40718C9.50324 5.51267 9.5625 5.65575 9.5625 5.80493V11.8049C9.5625 11.9541 9.50324 12.0972 9.39775 12.2027C9.29226 12.3082 9.14918 12.3674 9 12.3674Z' fill='white' />
  </>
  ...
}
```

## 3. Sử dụng
```tsx
import { Icon } from '@app/dekits/icon';

export function SampleComponent() {
  return (
    <Icon name='icon-x' width={18} height={18}/>
  )
}
```