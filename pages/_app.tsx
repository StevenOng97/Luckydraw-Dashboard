import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AuthProvider } from "../hooks/useAuth";
import { ReactQueryProvider } from "../lib/react-query";
import "../styles/index.css";
import { ThemeContext, Theme } from "../theme/ThemeContext";
import Toast from "../components/Toast/Toast";
import { LoadingContext, useLoading } from "../context/LoadingContext";
import Loading from "../components/Loading";
import classnames from "classnames";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [theme, setTheme] = useState(Theme.Toggled);
  const [loading, setLoading] = useState(true);

  const appWrapperClassName = classnames("", {
    ["opacity-50 pointer-events-none"]: loading,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ReactQueryProvider>
        <AuthProvider>
          <LoadingContext.Provider
            value={{
              loading,
              setLoading,
            }}
          >
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <div className={appWrapperClassName}>
                <Component {...pageProps} />
                {loading && <Loading />}
                <Toast isAutoClosed={true} isOpen={true} />
              </div>
            </ThemeContext.Provider>
          </LoadingContext.Provider>
        </AuthProvider>
      </ReactQueryProvider>
    </ApolloProvider>
  );
}
