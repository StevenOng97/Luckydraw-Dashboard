import { FC } from 'react';
import { AuthCheck } from '../components/AuthCheck';
import Layout from '../components/Layout';

const Dashboard: FC = () => {
  return (
    <AuthCheck>
      <Layout>
        <div className="flex-1 p-7">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </Layout>
    </AuthCheck>
  );
};

export default Dashboard;
