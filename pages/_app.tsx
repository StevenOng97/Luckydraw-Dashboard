import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../hooks/useAuth';
import { ReactQueryProvider } from '../lib/react-query';
import '../styles/index.css';
import { ThemeContext, Theme } from '../theme/ThemeContext';
import { LoadingContext } from '../context/LoadingContext';
import Loading from '../components/Loading';
import classnames from 'classnames';
import ToastProvider from '../providers/ToastProvider';
import ModalProvider from '../providers/ModalProvider';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [theme, setTheme] = useState(Theme.Toggled);
  const [loading, setLoading] = useState(false);

  const appWrapperClassName = classnames('', {
    ['opacity-50 pointer-events-none']: loading,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <ReactQueryProvider>
        <AuthProvider>
          <ModalProvider>
            <LoadingContext.Provider
              value={{
                loading,
                setLoading,
              }}
            >
              <ThemeContext.Provider value={{ theme, setTheme }}>
                <ToastProvider>
                  <div className={appWrapperClassName}>
                    <Component {...pageProps} />
                    {loading && <Loading />}
                  </div>
                </ToastProvider>
              </ThemeContext.Provider>
            </LoadingContext.Provider>
          </ModalProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </ApolloProvider>
  );
}
