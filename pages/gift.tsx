import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AuthCheck } from '../components/AuthCheck';
import CreateGiftForm from '../components/GiftForm/CreateGiftForm';
import Gift from '../components/Gifts/Gifts';
import Layout from '../components/Layout';
import { useLoading } from '../context/LoadingContext';
import { useModal } from '../context/ModalContext';
import useGift from '../hooks/useGift';
import useGiftCategory from '../hooks/useGiftCategory';

const Category = () => {
  const { loading } = useLoading();
  const { categories, createCategory, deleteCategory } = useGiftCategory();
  const { gifts, createBatchGifts } = useGift();

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
      createBatchGifts(finalData);
    } catch (err) {}
  });

  const renderListCategories = () => (
    <div className="ml-auto basis-1/2 py-6 mt-4 px-6 shadow rounded-lg sm:px-10 basis-1/3 bg-white">
      <div className="flex justify-between">
        <p className="basis-1/3">Tên quà</p>
        <p>Số lượng</p>
        {/* <p className="mr-1">Action</p> */}
      </div>
      {categories.map((category, index) => {
        const number = getGiftNumber(category.id);
        return (
          <Gift
            key={index}
            category={category}
            number={number}
          />
        );
      })}
    </div>
  );

  const getGiftNumber = (id: string) => {
    return gifts
      ? gifts.filter((gift) => gift.giftCategoryId === id)?.length
      : 0;
  };

  const cloneCategoryAsOptions = useMemo(() => {
    return categories?.map((category) => {
      return {
        ...category,
        value: category.id,
        label: category.name,
      };
    });
  }, [categories]);

  return (
    <AuthCheck>
      <Layout>
        <div className="flex-1 p-7">
          <h1 className="text-2xl font-semibold text-gray-900">Gift</h1>
          <div className="flex wrapper items-end flex-wrap">
            <div className="mt-2 text-black basis-full md:basis-1/2">
              <h2 className="text-l font-semibold">
                Tổng số lượng quà trong kho
              </h2>
              {categories && renderListCategories()}
            </div>
            {cloneCategoryAsOptions && (
              <CreateGiftForm
                options={cloneCategoryAsOptions}
                isLoading={loading}
                onSubmit={onSubmit}
                errors={errors}
                control={control}
                register={register}
                className="py-8 px-6 shadow rounded-lg sm:px-10 bg-white ml-0 basis-full mt-10 md:mt-0 md:ml-auto md:basis-1/3"
              />
            )}
          </div>
        </div>
      </Layout>
    </AuthCheck>
  );
};

export default Category;
