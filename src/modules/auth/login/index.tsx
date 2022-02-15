import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PageWrapper, DELayout } from '@app/dekits/layout';
import { ErrorMessage, FormWrapper, Input, InputPassword, SchemaOf, Yup } from '@app/dekits/form';
import { saveUserCredential } from '@app/services/auth';
import {login, loginByDiscord, loginByFacebook, loginByGoogle, loginBySteam} from '@app/api/user/login';
import { UserIcon } from '@app/dekits/icons/user-icon';
import { useSubscription } from '@app/hooks/subscription';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import DiscordLogin from "@app/pages/auth/discord";
import SteamLogin from "@app/pages/auth/steam";
import {useSession} from "@app/hooks/session";

const metadata = {
  title: 'Login',
  description: 'Login',
  url: '/auth/login',
};

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema: SchemaOf<LoginFormValues> = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export function Login() {
  const [error, changeError] = useState('');
  const {isLoggedIn} = useSession();
  const subscription = useSubscription();
  const router = useRouter();
  useEffect(() => {
    if(isLoggedIn) {
      router.back();
    }
  }, [isLoggedIn, router]);

  const handleLogin = useCallback((values: LoginFormValues) => {
    changeError('');

    const loginSub = login(values).subscribe(
      (res) => {
        saveUserCredential(res.data.token);
        router.push('/');
      },
      () => changeError('The Username or Password is Incorrect')
    );

    subscription.add(loginSub);
  }, [subscription, router]);

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!response) {
      alert('Login cancelled by user');
      return;
    }

    const googleLoginSub = loginByGoogle({
      id_token: (response as GoogleLoginResponse).tokenId,
      access_token: (response as GoogleLoginResponse).accessToken
    }).subscribe((res) => {
      saveUserCredential(res.data.token);
      router.push('/');
    });
    subscription.add(googleLoginSub);
  };

  const responseFacebook = (response: any) => {
    if (!response) {
      alert('Login cancelled by user');
      return;
    }
    const { accessToken: token } = response;
    const facebookLoginSub = loginByFacebook(token).subscribe((res) => {
      saveUserCredential(res.data.token);
      router.push('/');
    });
    subscription.add(facebookLoginSub);
  };

  const responseDiscord = (response: any) => {
    // success
    if (response && typeof response === 'string') {
      const discordLoginSub = loginByDiscord(response).subscribe((res) => {
        saveUserCredential(res.data.token);
        router.push('/');
      });
      subscription.add(discordLoginSub);
    }

    if (response && typeof response === 'object') {
      alert(response.error_description);
    }
  };

  const responseSteam = (response: any) => {
    if(!response)
      return;

    if(typeof response === 'string') {
      alert(response);
    } else {
      const steamLoginSub = loginBySteam(response).subscribe((res) => {
        saveUserCredential(res.data.token);
        router.push('/');
      });
      subscription.add(steamLoginSub);
    }
  }

  return (
    <PageWrapper metadata={metadata}>
      <div className='de-auth-form'>
        <div className='de-auth-form-title'>
          sign in
        </div>
        <div className='de-auth-form-description'>
          Enter your username and password for DESPORT.
        </div>
        {!!error && (
          <div className='de-form-group'>
            <div className='de-form-error'>{error}</div>
          </div>
        )}
        <div className='de-auth-form-body'>
          <FormWrapper<LoginFormValues>
            initialValues={{ username: 'vxhuy17694@gmail.com', password: '1234567890' }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            <div className='de-form-group form-group'>
              <Input name='username' placeholder='Username' icon={UserIcon} />
              <div className='de-form-error'>
                <ErrorMessage name='username' />
              </div>
            </div>

            <div className='de-form-group form-group'>
              <InputPassword name='password' placeholder='Password' />
              <div className='de-form-error'>
                <ErrorMessage name='password' />
              </div>
            </div>

            <div className='de-auth-form-forgot-link'>
              <Link href='/auth/forgot-password'>Forgot password?</Link>
            </div>

            <div className='de-auth-form-action'>
              <button type='submit' className='de-btn de-btn-primary w-100'>
                <span>sign in</span>
              </button>
            </div>
            <div className='de-auth-form-footer'>
              Don't have an account? <Link href='/auth/register'>Register</Link>
            </div>
            <div className='de-auth-form-separator' />
            <div className='de-auth-social-login'>
              <div className='de-auth-social-label'>Or continue with</div>
              <div className='de-auth-social-buttons'>
                <GoogleLogin clientId={process.env.GG_CLIENT_ID as string}
                  render={(props) => (
                    <button className='btn' onClick={props.onClick}
                      disabled={props.disabled}>
                      <svg width='36' height='37' viewBox='0 0 36 37' fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M35.649 18.4146C35.649 17.191 35.5498 15.9608 35.3382 14.7571H18.36V21.6886H28.0826C27.6791 23.9241 26.3828 25.9017 24.4846 27.1583V31.6558H30.2851C33.6913 28.5208 35.649 23.891 35.649 18.4146Z'
                          fill='#4285F4' />
                        <path
                          d='M18.36 36.0012C23.2147 36.0012 27.3088 34.4073 30.2917 31.6558L24.4912 27.1583C22.8774 28.2562 20.794 28.878 18.3666 28.878C13.6707 28.878 9.68907 25.7099 8.26045 21.4504H2.27478V26.0869C5.33045 32.1651 11.5542 36.0012 18.36 36.0012Z'
                          fill='#34A853' />
                        <path
                          d='M8.25379 21.4504C7.4998 19.2149 7.4998 16.7942 8.25379 14.5587V9.92224H2.27474C-0.278266 15.0084 -0.278266 21.0007 2.27474 26.0869L8.25379 21.4504Z'
                          fill='#FBBC04' />
                        <path
                          d='M18.36 7.12449C20.9263 7.08481 23.4065 8.05045 25.265 9.823L30.4041 4.68392C27.15 1.62826 22.8311 -0.051699 18.36 0.001213C11.5542 0.001213 5.33045 3.83733 2.27478 9.92221L8.25384 14.5586C9.67585 10.2926 13.6641 7.12449 18.36 7.12449Z'
                          fill='#EA4335' />
                      </svg>
                    </button>
                    // <a className="btn" href={`${API_END_POINT}/social/login/google`}>
                    //
                    // </a>
                  )}
                  buttonText='Login'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy='single_host_origin'
                />
                <FacebookLogin
                  appId={process.env.FACEBOOK_APP_ID}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(props) => (
                    <button className='btn' onClick={props.onClick} disabled={props.isProcessing}>
                      <svg width='36' height='36' viewBox='0 0 36 36' fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 26.9842 6.5823 34.431 15.1875 35.7813V23.2031H10.6172V18H15.1875V14.0344C15.1875 9.52313 17.8748 7.03125 21.9864 7.03125C23.9551 7.03125 26.0156 7.38281 26.0156 7.38281V11.8125H23.7459C21.51 11.8125 20.8125 13.2001 20.8125 14.625V18H25.8047L25.0066 23.2031H20.8125V35.7813C29.4177 34.431 36 26.9842 36 18Z'
                          fill='#1877F2' />
                        <path
                          d='M25.0066 23.2031L25.8047 18H20.8125V14.625C20.8125 13.2015 21.51 11.8125 23.7459 11.8125H26.0156V7.38281C26.0156 7.38281 23.9558 7.03125 21.9864 7.03125C17.8748 7.03125 15.1875 9.52313 15.1875 14.0344V18H10.6172V23.2031H15.1875V35.7813C17.0512 36.0729 18.9488 36.0729 20.8125 35.7813V23.2031H25.0066Z'
                          fill='white' />
                      </svg>
                    </button>
                  )}
                />
                <DiscordLogin implicitAuth={true} cssClass='btn' scope='identify email' onSuccess={responseDiscord} clientId={process.env.DISCORD_APP_ID} onFailure={responseDiscord}>
                  <svg width='36' height='36' viewBox='0 0 36 36' fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M30.4755 6.23342C28.181 5.1806 25.7205 4.40493 23.1478 3.96066C23.101 3.95209 23.0542 3.97352 23.0301 4.01637C22.7136 4.5792 22.3631 5.31344 22.1176 5.89056C19.3506 5.47631 16.5978 5.47631 13.8875 5.89056C13.642 5.30062 13.2787 4.5792 12.9609 4.01637C12.9367 3.97495 12.8899 3.95352 12.8431 3.96066C10.2719 4.40351 7.81134 5.17918 5.5154 6.23342C5.49553 6.24199 5.47849 6.25629 5.46718 6.27485C0.800088 13.2474 -0.478425 20.0485 0.14877 26.7654C0.151608 26.7982 0.170055 26.8297 0.195597 26.8497C3.27481 29.111 6.25756 30.4838 9.18492 31.3937C9.23177 31.408 9.28141 31.3909 9.31122 31.3523C10.0037 30.4067 10.621 29.4096 11.1502 28.361C11.1814 28.2996 11.1516 28.2267 11.0878 28.2024C10.1087 27.831 9.1764 27.3782 8.27959 26.864C8.20866 26.8225 8.20298 26.7211 8.26824 26.6725C8.45696 26.5311 8.64573 26.3839 8.82593 26.2354C8.85853 26.2082 8.90397 26.2025 8.9423 26.2197C14.8339 28.9096 21.2123 28.9096 27.0344 26.2197C27.0728 26.2011 27.1182 26.2068 27.1522 26.234C27.3325 26.3825 27.5212 26.5311 27.7113 26.6725C27.7766 26.7211 27.7723 26.8225 27.7014 26.864C26.8046 27.3882 25.8723 27.831 24.8918 28.201C24.8279 28.2253 24.7995 28.2996 24.8308 28.361C25.3714 29.4081 25.9887 30.4052 26.6683 31.3509C26.6967 31.3909 26.7478 31.408 26.7946 31.3937C29.7362 30.4838 32.7189 29.111 35.7981 26.8497C35.8251 26.8297 35.8422 26.7997 35.845 26.7668C36.5956 19.0014 34.5877 12.256 30.5223 6.27627C30.5124 6.25629 30.4954 6.24199 30.4755 6.23342ZM12.03 22.6755C10.2562 22.6755 8.7947 21.0471 8.7947 19.0471C8.7947 17.0472 10.2279 15.4187 12.03 15.4187C13.8463 15.4187 15.2937 17.0615 15.2653 19.0471C15.2653 21.0471 13.8321 22.6755 12.03 22.6755ZM23.9921 22.6755C22.2184 22.6755 20.7568 21.0471 20.7568 19.0471C20.7568 17.0472 22.19 15.4187 23.9921 15.4187C25.8084 15.4187 27.2558 17.0615 27.2275 19.0471C27.2275 21.0471 25.8084 22.6755 23.9921 22.6755Z'
                      fill='#5865F2' />
                  </svg>
                </DiscordLogin>
                <SteamLogin cssClass='btn' onSuccess={responseSteam} onFailure={responseSteam}
                >
                  <svg width='36' height='36' viewBox='0 0 36 36' fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M0.755728 23.1775C2.97954 30.5954 9.85863 36 18.0002 36C27.9411 36 36.0002 27.9409 36.0002 18C36.0002 8.0589 27.9411 0 18.0002 0C8.46081 0 0.655299 7.42079 0.0388184 16.8041C1.20366 18.7602 1.6582 19.97 0.755898 23.1775H0.755728Z'
                      fill='url(#paint0_linear_519_7743)' />
                    <path
                      d='M17.073 13.4918C17.073 13.5221 17.073 13.5524 17.0745 13.5808L12.6699 19.9792C11.9564 19.9468 11.2404 20.072 10.5615 20.3516C10.2622 20.4737 9.98177 20.6235 9.71864 20.7966L0.046695 16.815C0.0467707 16.815 -0.177108 20.4968 0.755571 23.2409L7.5931 26.0622C7.93641 27.5964 8.98891 28.9422 10.5417 29.5895C13.0822 30.651 16.0115 29.4412 17.0684 26.8996C17.3434 26.2352 17.4716 25.5384 17.4531 24.8431L23.7554 20.3392C23.8064 20.3408 23.8589 20.3423 23.9099 20.3423C27.6814 20.3423 30.7468 17.2677 30.7468 13.4918C30.7468 9.7157 27.6814 6.6438 23.9099 6.6438C20.1399 6.6438 17.073 9.7157 17.073 13.4918ZM16.0162 26.4577C15.1982 28.4215 12.9415 29.3532 10.9799 28.5358C10.0749 28.1588 9.39171 27.4682 8.99756 26.6447L11.2232 27.5671C12.6699 28.1696 14.3296 27.4836 14.9309 26.0374C15.5341 24.5897 14.8498 22.9272 13.4039 22.3247L11.1032 21.3714C11.991 21.0345 13.0002 21.0222 13.9432 21.4146C14.8938 21.8101 15.6315 22.5549 16.0224 23.5066C16.4133 24.4584 16.4117 25.509 16.0162 26.4577ZM23.9099 18.0556C21.3992 18.0556 19.3551 16.0084 19.3551 13.4918C19.3551 10.9772 21.3992 8.92941 23.9099 8.92941C26.4222 8.92941 28.4663 10.9772 28.4663 13.4918C28.4663 16.0084 26.4222 18.0556 23.9099 18.0556ZM20.4969 13.4849C20.4969 11.5917 22.0296 10.0562 23.9176 10.0562C25.8072 10.0562 27.34 11.5917 27.34 13.4849C27.34 15.3782 25.8072 16.9123 23.9176 16.9123C22.0296 16.9123 20.4969 15.3782 20.4969 13.4849Z'
                      fill='white' />
                    <defs>
                      <linearGradient id='paint0_linear_519_7743' x1='18.0195' y1='0' x2='18.0195'
                        y2='36' gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#111D2E' />
                        <stop offset='0.21248' stopColor='#051839' />
                        <stop offset='0.40695' stopColor='#0A1B48' />
                        <stop offset='0.5811' stopColor='#132E62' />
                        <stop offset='0.7376' stopColor='#144B7E' />
                        <stop offset='0.87279' stopColor='#136497' />
                        <stop offset='1' stopColor='#1387B8' />
                      </linearGradient>
                    </defs>
                  </svg>
                </SteamLogin>
              </div>
            </div>
          </FormWrapper>
        </div>
      </div>
    </PageWrapper>
  );
};

Login.layout = DELayout.AUTH;
