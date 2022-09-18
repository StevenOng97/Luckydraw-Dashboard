import { useState } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../hooks/useAuth';
import { ReactQueryProvider } from '../lib/react-query';
import '../styles/index.css';
import { ThemeContext, Theme } from '../theme/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [theme, setTheme] = useState(Theme.Toggled);

  return (
    <ApolloProvider client={apolloClient}>
      <ReactQueryProvider>
        <AuthProvider>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </AuthProvider>
      </ReactQueryProvider>
    </ApolloProvider>
  );
}
