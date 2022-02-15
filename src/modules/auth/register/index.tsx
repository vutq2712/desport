import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { PageWrapper, DELayout } from '@app/dekits/layout';
import { FormWrapper, SchemaOf, Yup, FormikProps, Select, ErrorMessage } from '@app/dekits/form';
import { FormItemInput, FormItemCheckbox, FormItemDate, FormItemGender } from './components/form-item/register';
import { register } from '@app/api/user/register';
import { MailSubscribe } from '@app/types/user.type';
import Link from 'next/link';
import { useSubscription } from '@app/hooks/subscription';
import { UserIcon } from '@app/dekits/icons/user-icon';
import { LockIcon } from '@app/dekits/icons/lock-icon';
import { EmailIcon } from '@app/dekits/icons/email-icon';
import { countries } from '@app/dekits/utils';

interface RegisterFormValues {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
  country?: string;
  dob: string;
  policy: string[];
  subscribe: string[];
}

const validationSchema: SchemaOf<RegisterFormValues> = Yup.object({
  username: Yup.string()
    .min(6, 'Min 6 characters')
    .max(30, 'Max 30 characters')
    .matches(/^(?!\.)(?!.*\.$)(?!.*?\.\.)[a-zA-Z0-9.]+$/, 'Usernames must contain letters (a-z), numbers (0-9), and periods (.)')
    .required('Required'),
  name: Yup.string().required('Required').max(64, 'Max 64 characters'),
  password: Yup.string()
    .min(8, 'Password needs at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()?-])[A-Za-z\d!@#$%^&*()?-]+$/, 'Must contain some mix of letters, numbers, and/or symbols.')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(8, 'Password needs at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()?-])[A-Za-z\d!@#$%^&*()?-]+$/, 'Must contain some mix of letters, numbers, and/or symbols.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  gender: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  dob: Yup.string().required('Required').test('min age', 'Must be older than 18 age',
    value => value ? (dayjs(value).year() + 18) <= dayjs().year() : true
  ),
  policy: Yup.array().test('policy', 'Policy tick box', value => value?.length === 1),
  subscribe: Yup.array(),
})

export function Register() {
  const [error, changeError] = useState('');
  const subscription = useSubscription();
  const router = useRouter();
  const formikRef = useRef<FormikProps<RegisterFormValues>>(null);

  const metadata = {
    title: 'Register',
    description: 'Register',
    url: '/auth/register',
  };

  const initialValues: RegisterFormValues = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    gender: 'M',
    country: '',
    dob: '',
    policy: [],
    subscribe: [],
  }

  const onSubmit = useCallback((values: RegisterFormValues) => {
    const { policy, ...body } = values;

    const registerSub = register({
      ...body,
      subscribe: values.subscribe.length
        ? MailSubscribe.YES : MailSubscribe.NO,
      dob: values.dob ? dayjs(values.dob).format('DD/MM/YYYY') : '',
    }).subscribe({
      next: res => {
        res.data?.user_id && router.push(`/auth/register-success?email=${values.email}&_id=${res.data.user_id}`);
      },
      error: error => {
        const msg: string = error?.msg || 'Something went wrong';
        if (msg.toLowerCase().includes('username')) {
          formikRef.current?.setFieldError('username', msg)
        } else if (msg.toLowerCase().includes('email')) {
          formikRef.current?.setFieldError('email', msg)
        } else {
          changeError(msg);
        }
      }
    })

    subscription.add(registerSub);
  }, [subscription, router])

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-auth-form'>
        <div className='de-auth-form-title'>
          New Account
        </div>
        <div className='de-auth-form-description'></div>
        <div className='de-auth-form-body'>
          {!!error && (
            <div className='de-form-error'>{error}</div>
          )}
          <FormWrapper<RegisterFormValues>
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <FormItemInput name='username' label='Username' icon={UserIcon} />
            <FormItemInput name='name' label='Full name' />
            <FormItemInput name='password' label='Password' type='password' icon={LockIcon} />
            <FormItemInput name='confirmPassword' label='Retype password' type='password' icon={LockIcon} />
            <FormItemInput name='email' label='Email' icon={EmailIcon} />
            <div className='row'>
              <div className='col-md-6'>
                <div className='de-form-group form-group'>
                  <Select name='country' options={countries} hasIcon />
                  <div className='de-form-error'>
                    <ErrorMessage name='country' />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <FormItemDate name='dob' label='Date of birth' />
              </div>
            </div>
            <div className='d-none'>
              <FormItemGender name='gender' label='Gender' />
            </div>

            <div className='de-auth-form-confirm'>
              <FormItemCheckbox className='mb-2' name='policy' label="I agree to all <a href='/policy'>Policy and Regulation</a>." />
              <FormItemCheckbox name='subscribe' label='Sign me up for email newsletter.' />
            </div>
            <div className='de-auth-form-action'>
              <button type='submit' className='de-btn de-btn-primary w-100'>
                <span>proceed</span>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997C10.91 5.08997 10.91 5.71997 11.3 6.10997L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z' fill='white' />
                </svg>
              </button>
            </div>
            <div className='de-auth-form-footer'>
              Already have an account? <Link href='/auth/login'>Sign In</Link>
            </div>
          </FormWrapper>
        </div>
      </div>

    </PageWrapper>
  );
};

Register.layout = DELayout.AUTH;
