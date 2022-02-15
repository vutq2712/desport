# C. Internationalization(i18n)
_(I18N trong mục này hiện tại sẽ chỉ tập trung vào cách tạo web đa ngôn ngữ)_

## 1. t - translate function
`t` là một global function(=> không cần import để sử dụng).

## 2. Config ngôn ngữ
Config đươc đặt tại folder ...
```ts
//
const messages = {
  ...
  'form.number_min': 'Value must be greater than {{min}}.',
  ...
}

//

export function getValidationSchema() {
  const validationSchema: SchemaOf<BracketFormValues> = Yup.object({
    game_per_round: Yup.number().min(1, t('form.number_min', { min: 1 })),
  });

  return validationSchema;
}
```

## 3.
### 3.1.
`t` phụ thuộc vào DeAppContext để chọn được ngôn ngữ cần hiển thị nên ví dụ dưới đây sẽ fail.
```tsx
const validationSchema: SchemaOf<ForgotPasswordFormValues> = Yup.object({
  email: Yup.string().email(t('form.email_type')).required(t('form.required')),
});

function DummyComponent() {
  return (
    <FormWrapper<ForgotPasswordFormValues>
      validationSchema={validationSchema}
    >
      ...
    </FormWrapper>
  );
}
```

=> cần sửa thành:

```tsx
function getValidationSchema() {
  const validationSchema: SchemaOf<ForgotPasswordFormValues> = Yup.object({
    email: Yup.string().email(t('form.email_type')).required(t('form.required')),
  });

  return validationSchema;
}

function DummyComponent() {
  const validationSchema = getValidationSchema();

  return (
    <FormWrapper<ForgotPasswordFormValues>
      validationSchema={validationSchema}
    >
      ...
    </FormWrapper>
  );
}
```

### 3.2.
Bởi vì cách hoạt động của `t` function nên nó sẽ không "react", khi chuyển ngôn ngữ cần reload lại page.