import { FC, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const IndexPage: FC = () => {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const path = user ? 'dashboard' : 'signin';

    router.push(path);
  }, [user]);

  return <div></div>;
};
export default IndexPage;
