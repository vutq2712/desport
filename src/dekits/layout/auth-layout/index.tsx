import React from 'react';
import Logo from 'styles/uikit/media/iconset/Logo.svg';

interface AuthLayoutProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNode;
}

export function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className='de-auth-layout'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='de-auth-page-logo'>
              <img src='/assets/images/auth-page-logo.svg' alt='Dessport' />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='de-auth-page'>
              <div className='de-auth-page-body'>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
