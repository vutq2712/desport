import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { PageWrapper, DELayout } from '@app/dekits/layout';
import { ErrorMessage, FormikProps, FormWrapper, Input, SchemaOf, Yup } from '@app/dekits/form';
import { forgotPassword } from '@app/api/user/forgot-password';
import Link from 'next/link';
import { EmailIcon } from '@app/dekits/icons/email-icon';
import { useSubscription } from '@app/hooks/subscription';

const metadata = {
  title: 'Forgot password',
  description: 'ForgotPassword',
  url: '/auth/forgotPassword',
};

interface ForgotPasswordFormValues {
  email: string;
}

function getValidationSchema() {
  const validationSchema: SchemaOf<ForgotPasswordFormValues> = Yup.object({
    email: Yup.string().email(t('form.email_type')).required(t('form.required')),
  });

  return validationSchema;
}

export function ForgotPassword() {
  const subscription = useSubscription();
  const router = useRouter();
  const formikRef = useRef<FormikProps<ForgotPasswordFormValues>>(null);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  const handleForgotPassword = useCallback((values: ForgotPasswordFormValues) => {
    const forgotPasswordSub = forgotPassword(values).subscribe(
      (res) => router.push(`/auth/reset-password?uuid=${encodeURIComponent(res.data.user_id)}`),
      (error) => {
        const msg: string = error?.msg || 'Something went wrong';

        formikRef.current?.setFieldError('email', msg);
      }
    );

    subscription.add(forgotPasswordSub);
  }, [subscription, router]);

  const validationSchema = getValidationSchema();

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-auth-form fixed-footer'>
        <div className='de-auth-form-title'>
          verify email
        </div>
        <div className='de-auth-form-description'>
          We will send you a verification OTP via email.
        </div>
        <div className='de-auth-form-body'>
          <FormWrapper<ForgotPasswordFormValues>
            innerRef={formikRef}
            initialValues={{ email: '' }}
            onSubmit={handleForgotPassword}
            validationSchema={validationSchema}
          >
            <div className='de-auth-form-wrap'>
              <div className='de-form-group form-group'>
                <Input name='email' placeholder='Your registered email' icon={EmailIcon} />
                <div className='de-form-error'>
                  <ErrorMessage name='email' />
                </div>
              </div>
            </div>
            <div className='de-auth-form-action'>
              <div className='row'>
                <div className='col-md-4 col-6'>
                  <Link href='/auth/login'>
                    <a className='de-btn w-100'>
                      <span>cancel</span>
                    </a>
                  </Link>
                </div>
                <div className='col-md-8 col-6'>
                  <button type='submit' className='de-btn de-btn-primary w-100'>
                    <span>Send me an email</span>
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

ForgotPassword.layout = DELayout.AUTH;
