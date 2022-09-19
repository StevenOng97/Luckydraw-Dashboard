import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import SignInForm from "../../components/AuthForm/SignInForm";
import { useAuth } from "../../hooks/useAuth";

const SignIn: FC = () => {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: "all",
  });

  const router = useRouter();
  const { login } = useAuth();

  const onLoginSubmit = handleSubmit(async (data) => {
    const finalData = JSON.parse(JSON.stringify(data));

    setLoading(true);

    try {
      await login(finalData);
    } catch (err) {
      setError("password", {
        type: "wrong-code",
        message: err.message,
      });
    }

    router.push("/dashboard");
    setLoading(false);
  });

  return (
    <div className="bg-slate-200">
      <div className="sign-in-wrapper flex flex-column items-center px-5 py-5 container mx-auto min-h-screen">
        <div className="py-8 px-6 shadow rounded-lg sm:px-10 basis-1/3 bg-white">
          <SignInForm
            isLoading={isLoading}
            onSubmit={onLoginSubmit}
            errors={errors}
            control={control}
            register={register}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
