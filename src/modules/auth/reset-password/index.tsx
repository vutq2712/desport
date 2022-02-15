import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSubscription } from '@app/hooks/subscription';
import { PageWrapper, DELayout } from '@app/dekits/layout';
import { FormWrapper, ErrorMessage, Input, InputPassword, SchemaOf, Yup } from '@app/dekits/form';
import { confirmForgotPassword } from '@app/api/user/confirm-forgot-password';

const metadata = {
  title: 'Reset password',
  description: 'ResetPwd',
  url: '/auth/resetPwd',
};

interface ResetPwdFormValues {
  uuid: string;
  numberVerify: string;
  password: string;
  confirmPassword: string;
}

const validationSchema: SchemaOf<ResetPwdFormValues> = Yup.object({
  uuid: Yup.string().required('Required'),
  numberVerify: Yup.string().required('Required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export function ResetPassword() {
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    console.log('router.query.uuid', router.query.uuid)
    if (!router.query.uuid) {
      // router.push('/')
    }
  }, [router]);

  const handleResetPwd = useCallback((values: ResetPwdFormValues) => {
    const confirmForgotPwdSub = confirmForgotPassword(values)
      .subscribe(() => {
        router.push('/auth/login')
      });

    subscription.add(confirmForgotPwdSub);
  }, [subscription, router]);

  const initialValues = useMemo(() => ({
    uuid: router.query.uuid as string,
    numberVerify: '',
    password: '',
    confirmPassword: '',
  }), [router]);

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-auth-form fixed-footer'>
        <div className='de-auth-form-title'>
          Reset Password
        </div>
        <div className='de-auth-form-description'>
          Enter your new password
        </div>
        <div className='de-auth-form-body'>
          <FormWrapper<ResetPwdFormValues>
            initialValues={initialValues}
            onSubmit={handleResetPwd}
            validationSchema={validationSchema}
          >
            <div className='de-auth-form-wrap'>
              <div className='de-form-group form-group'>
                <Input name='numberVerify' placeholder='Verification Code' />
                <div className='de-form-error'>
                  <ErrorMessage name='numberVerify' />
                </div>
              </div>

              <div className='de-form-group form-group'>
                <InputPassword name='password' placeholder='New password' />
                <div className='de-form-error'>
                  <ErrorMessage name='password' />
                </div>
              </div>

              <div className='de-form-group form-group'>
                <InputPassword name='confirmPassword' placeholder='Retype password' />
                <div className='de-form-error'>
                  <ErrorMessage name='confirmPassword' />
                </div>
              </div>
            </div>
            <div className='de-auth-form-action'>
              <button type='submit' className='de-btn de-btn-primary w-100'>
                <span>Reset password</span>
              </button>
            </div>
          </FormWrapper>
        </div>
      </div>
    </PageWrapper>
  );
};

ResetPassword.layout = DELayout.AUTH;
