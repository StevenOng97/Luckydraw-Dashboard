import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  Controller,
} from "react-hook-form";
import Input, { InputProps } from "./Input";
import { ErrorMessage } from "@hookform/error-message";
import InputMask from "react-input-mask";
import classnames from "classnames";

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  label?: Path<TFormValues>;
  control?: any;
  type: any;
  renderLabel?: boolean;
} & Omit<InputProps, "name">;

const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors = {},
  className,
  control,
  label,
  type,
  renderLabel = true,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = errors[name];
  const hasError = !!(errors && errorMessages);

  const renderInput = () => {
    if (type !== "phone") {
      return (
        <Input
          name={name}
          aria-invalid={hasError}
          className={className}
          {...props}
          {...(register && register(name, rules))}
          type={type}
        />
      );
    } else {
      return (
        <Controller
          control={control}
          name="phone"
          rules={rules}
          render={({ field }) => (
            <InputMask
              mask="(999) 999-9999"
              maskChar=""
              value={field.value}
              onChange={field.onChange}
            >
              {(props) => (
                <Input aria-invalid={hasError} {...props} type="text" />
              )}
            </InputMask>
          )}
        />
      );
    }
  };

  const errorWrapperClassnames = classnames("h-4", {
    ["opacity-1"]: errors,
    ["opacity-0"]: !errors,
  });

  const renderErrorMsg = () => (
    <ErrorMessage
      errors={errors}
      name={name as any}
      render={({ message }) => (
        <small className="mb-0 text-red-600">{message}</small>
      )}
    />
  );

  return (
    <div aria-live="polite" className="basis-5/12 mb-3">
      {renderLabel && (
        <p className="mb-1">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          {!rules?.required && <span> - Optional</span>}
        </p>
      )}
      {renderInput()}
      {renderErrorMsg()}
    </div>
  );
};

export default FormInput;
