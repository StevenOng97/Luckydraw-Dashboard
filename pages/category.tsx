import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useLoading } from "../context/LoadingContext";

const Category = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
  }, [])
  return (
    // <AuthCheck>
    <Layout>
      <div className="flex-1 p-7">
        <h1 className="text-2xl font-semibold text-gray-900">Category</h1>
      </div>
    </Layout>
    // </AuthCheck>
  );
};

export default Category;
