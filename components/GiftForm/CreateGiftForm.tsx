import React, { FC } from 'react';
import { createGiftForm } from '../../helpers/CreateGiftForm';
import Form from '../Form/Form';
import FormInput from '../Form/FormInput';
import { CommonFormProps } from '../../interfaces/Form';
import { useLoading } from '../../context/LoadingContext';
import FormSelect from '../Form/FormSelect';

const CreateGiftCategoryForm: FC<CommonFormProps> = ({
  onSubmit,
  register,
  errors,
  control,
  className,
  options
}) => {
  const { loading } = useLoading();
  const renderCreateGiftCategoryForm = () => {
    return (
      <Form loading={loading} submit={onSubmit} className={className}>
        {createGiftForm.map((field, i) => {
          const { placeholder, type, rules, name, id } = field;
          if (name === 'giftCategoryId') {
            return (
              <FormSelect
                key={i}
                id={id}
                type={type}
                name={name}
                label={placeholder}
                className="mb-2 form-control"
                register={register}
                rules={rules}
                errors={errors}
                options={options}
                control={control}
              />
            );
          }
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
