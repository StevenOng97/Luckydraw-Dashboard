import React, { FC } from 'react';
import { signUpForm } from '../../helpers/AuthForm';
import { AuthFormProps } from '../../interfaces/Auth';
import Form from '../Form/Form';
import FormInput from '../Form/FormInput';

const SignUpForm: FC<AuthFormProps> = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
}) => {
  const renderInformationForm = () => {
    return (
      <Form submit={onSubmit} loading={isLoading}>
        {signUpForm.map((field, i) => {
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

  return <div>{renderInformationForm()}</div>;
};

export default SignUpForm;
