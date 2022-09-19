import React, { FC } from 'react';
import { signInForm } from '../../helpers/AuthForm';
import Form from '../Form/Form';
import FormInput from '../Form/FormInput';
import { AuthFormProps } from '../../interfaces/Auth';

const SignInForm: FC<AuthFormProps> = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
}) => {
  const renderInformationForm = () => {
    return (
      <Form submit={onSubmit} loading={isLoading}>
        {signInForm.map((field, i) => {
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

  return <>{renderInformationForm()}</>;
};

export default SignInForm;
