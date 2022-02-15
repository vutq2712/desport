# B. Tạo Form
(basic)

Lưu ý: cần phải định nghĩa form values rõ ràng khi tạo form.  
_(Trong ví dụ dưới sẽ chỉ tập trung vào cách tạo form, I18N sẽ được hướng dẫn ở phần sau)._
```tsx
import { FormWrapper, Input, InputPassword, ErrorMessage, SchemaOf, Yup } from '@app/dekits/form';
import { Button } from '@app/dekits/button';

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema: SchemaOf<LoginFormValues> = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export function LoginForm() {
  // Cần tạo intialValues với useMemo nếu không muốn xảy ra lỗi không mong muốn sau này.
  const initialValues = useMemo(() => ({ username: '', password: ''}), []);
  const handleLogin = useCallback((values: LoginFormValues) => {
    // call api ...
  }, [])

  return (
    <FormWrapper<LoginFormValues>
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={validationSchema}
    >
      <Input name='username' placeholder='Username' />
      <ErrorMessage name='username' />

      <InputPassword name='password' placeholder='Password' />
      <ErrorMessage name='password' />

      <Button type='submit'>Login</Button>
    </FormWrapper>
  );
}
```