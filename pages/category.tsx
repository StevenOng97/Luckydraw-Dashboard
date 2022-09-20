import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthCheck } from '../components/AuthCheck';
import GiftCategory from '../components/GiftCategory/GiftCategory';
import CreateGiftCategoryForm from '../components/GiftForm/CreateGiftCategoryForm';
import Layout from '../components/Layout';
import { useLoading } from '../context/LoadingContext';
import { useModal } from '../context/ModalContext';
import useGiftCategory from '../hooks/useGiftCategory';

const Category = () => {
  const { loading } = useLoading();
  const { categories, createCategory, deleteCategory } = useGiftCategory();
  const { hideModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = handleSubmit(async (data) => {
    const finalData = JSON.parse(JSON.stringify(data));

    try {
      createCategory(finalData);
    } catch (err) {}
  });

  const renderListCategories = () => (
    <div className="ml-auto basis-1/3 py-6 mt-4 px-6 shadow rounded-lg sm:px-10 basis-1/3 bg-white">
      <div className="flex justify-between">
        <p className="basis-1/3">Tên quà</p>
        <p>Rate</p>
        <p className="mr-1">Action</p>
      </div>
      {categories.map((category, index) => (
        <GiftCategory
          key={index}
          category={category}
          index={index}
          renderDeleteModal={renderDeleteModal}
        />
      ))}
    </div>
  );

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const renderDeleteModal = (category) => (
    <div>
      <div className="flex justify-center mb-2"></div>
      <div className="p-4 text-center">
        <svg
          aria-hidden="true"
          className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this product?
        </h3>
        <button
          type="button"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          onClick={() => handleDeleteCategory(category.id)}
        >
          Yes, I'm sure
        </button>
        <button
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={hideModal}
        >
          No, cancel
        </button>
      </div>
    </div>
  );

  return (
    <AuthCheck>
      <Layout>
        <div className="flex-1 p-7">
          <h1 className="text-2xl font-semibold text-gray-900">Category</h1>
          <div className="flex wrapper items-start">
            <div className="mt-2 text-black basis-1/3">
              <h2 className="text-l font-semibold">List quà tặng đang có:</h2>
              {categories && renderListCategories()}
            </div>
            <CreateGiftCategoryForm
              isLoading={loading}
              onSubmit={onSubmit}
              errors={errors}
              control={control}
              register={register}
              className="ml-auto basis-1/3 py-8 px-6 shadow rounded-lg sm:px-10 basis-1/3 bg-white"
            />
          </div>
        </div>
        {/* <Modal isOpen={openModal} setModalState={setOpenModal}> */}
        {/* <div>
          <div className="flex justify-center mb-2"></div>
          <div className="p-4 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={handleDeleteCategory}
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setOpenModal(false)}
            >
              No, cancel
            </button>
          </div>
        </div> */}
        {/* </Modal> */}
      </Layout>
    </AuthCheck>
  );
};

export default Category;
