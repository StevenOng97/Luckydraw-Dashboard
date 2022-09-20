import React, { FC } from 'react';
import { createGiftCategoryForm } from '../../helpers/CreateGiftCategoryForm';
import Form from '../Form/Form';
import FormInput from '../Form/FormInput';
import { CommonFormProps } from '../../interfaces/Form';
import { useLoading } from '../../context/LoadingContext';

const CreateGiftCategoryForm: FC<CommonFormProps> = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
  className,
}) => {
  const { loading } = useLoading();
  const renderCreateGiftCategoryForm = () => {
    return (
      <Form loading={loading} submit={onSubmit} loading={isLoading} className={className}>
        {createGiftCategoryForm.map((field, i) => {
          const { placeholder, type, rules, name, id } = field;
          return (
            <FormInput
              key={i}
              id={id}
              type={type}
              name={name}
              label={placeholder}
              className="mb-2 form-control"
              register={register}
              rules={rules}
              errors={errors}
              control={control}
            />
          );
        })}
      </Form>
    );
  };

  return <>{renderCreateGiftCategoryForm()}</>;
};

export default CreateGiftCategoryForm;
