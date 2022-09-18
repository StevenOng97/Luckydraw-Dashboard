import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignInForm from '../../components/AuthForm/SignInForm';
import { useAuth } from '../../hooks/useAuth';

const SignIn: FC = () => {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: 'all',
  });

  const { login } = useAuth();

  const onLoginSubmit = handleSubmit(async (data) => {
    const finalData = JSON.parse(JSON.stringify(data));

    setLoading(true);

    try {
      await login(finalData);
    } catch (err) {
      setError('password', {
        type: 'wrong-code',
        message: err.message,
      });
    }

    setLoading(false);
  });

  return (
    <div className="sign-in-wrapper flex flex-column items-center px-5 py-5 container mx-auto min-h-screen">
      <SignInForm
        isLoading={isLoading}
        onSubmit={onLoginSubmit}
        errors={errors}
        control={control}
        register={register}
      />
    </div>
  );
};

export default SignIn;
