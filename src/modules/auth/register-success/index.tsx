import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { PageWrapper, DELayout } from '@app/dekits/layout';
import { useSubscription } from '@app/hooks/subscription';
import { ErrorMessage, FormWrapper, Input, Yup, SchemaOf, FormikProps } from '@app/dekits/form';
import { verifyUser } from '@app/api/user/verify-user';
import { resendVerifyEmail } from '@app/api/user/resend-verify-email';

interface VerifyFormValues {
  numberVerify: string;
}

const validationSchema: SchemaOf<VerifyFormValues> = Yup.object({
  numberVerify: Yup.string().required('Required'),
});

export function RegisterSuccess() {
  const subscription = useSubscription();
  const router = useRouter();
  const formikRef = useRef<FormikProps<VerifyFormValues>>(null);

  const metadata = {
    title: 'Thank you for register',
    description: 'Register',
    url: '/auth/register',
  };

  useEffect(() => {
    if (!router.query.email || !router.query._id) {
      router.push('/auth/register');
    }
  }, [router])

  const onResendMail = () => {
    const sub = resendVerifyEmail(router.query.email as string).subscribe(res => {
      if (res && res.code === 200) {
        alert('Success');
      }
    }, (error) => {
      const msg: string = error?.msg || 'Something went wrong';

      alert(msg);
    })

    subscription.add(sub);
  }

  const onVerifyUser = (values: VerifyFormValues) => {
    const sub = verifyUser({
      email: router.query.email as string,
      user_id: router.query._id as string,
      numberVerify: values.numberVerify,
    }).subscribe({
      next: res => {
        if (res) {
          router.push('/auth/login');
        }
      },
      error: error => {
        const msg: string = error?.msg || 'Something went wrong';

        formikRef.current?.setFieldError('numberVerify', msg)
      }
    })

    subscription.add(sub);
  }

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-auth-form fixed-footer'>
        <div className='de-auth-form-title'>
          Thank You For Registering!
        </div>
        <div className='de-auth-form-description'>
          Please verify the registration by input<br />
          the code we had sent to your email.
        </div>
        <div className='de-auth-form-body'>
          <FormWrapper<VerifyFormValues>
            innerRef={formikRef}
            initialValues={{ numberVerify: '' }}
            validationSchema={validationSchema}
            onSubmit={onVerifyUser}
          >
            <div className='de-auth-form-wrap'>
              <div className='de-form-group form-group'>
                <Input name='numberVerify' placeholder='Verify number' />
                <div className='de-form-error'>
                  <ErrorMessage name='numberVerify' />
                </div>
              </div>
            </div>
            <div className='de-auth-form-action'>
              <div className='row'>
                <div className='col-6'>
                  <button type='button' className='de-btn' onClick={onResendMail}>Resend Email</button>
                </div>
                <div className='col-6'>
                  <button type='submit' className='de-btn de-btn-primary w-100'>
                    <span>Verify</span>
                  </button>
                </div>
              </div>

            </div>
          </FormWrapper>
        </div>
      </div>
    </PageWrapper>
  );
};

RegisterSuccess.layout = DELayout.AUTH;
