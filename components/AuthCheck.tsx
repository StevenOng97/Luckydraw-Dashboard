import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';

export const AuthCheck = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  if (typeof window !== 'undefined' && user === null) router.push('/signin');

  if (!user)
    return (
      <div>
        <Loading />
      </div>
    ); // a loading component that prevents the page from rendering

  return children;
};
