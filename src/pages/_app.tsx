import '../styles/globals.scss';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/main.scss';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { getLayout, DELayout } from '@app/dekits/layout';
import { Loading } from '@app/dekits/components/loading';
import { DeAppContext } from '@app/context/de-app.ctx';
import '@app/services/global';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

type NextPageWithLayout = NextPage & {
  layout?: DELayout;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function getLibrary(provider) {
  return new Web3(provider)
}

function DeApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = getLayout(Component.layout);
  const [showLoading, setShowLoading] = useState(true);

  const hideLoading = () => {
    setTimeout(() => {
      setShowLoading(false);
    }, 500)
  }

  useEffect(() => {
    window.onload = () => {
      hideLoading();
    }
  }, [])

  useEffect(() => {
    hideLoading();
  }, [pageProps])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DeAppContext.Provider
        value={{
          locale: pageProps.locale
        }}
      >
        <Layout>
          <Loading show={showLoading} />
          <Component {...pageProps} />
        </Layout>
      </DeAppContext.Provider>
    </Web3ReactProvider>
  );
}

DeApp.getInitialProps = async (appCtx) => {
  const { ctx, Component } = appCtx;
  const pageProps = { locale: ctx.locale }

  if (Component.getServerSideProps) {
    Object.assign(pageProps, await Component.getServerSideProps(ctx))
  }
  const initProps = ctx.locale ? {
    pageProps,
    langCnf: require(`@app/const/lang/${ctx.locale}`).messages,
  } : {pageProps};
  
  return initProps;
}

export default appWithTranslation(DeApp);
