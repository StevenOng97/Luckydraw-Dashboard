import { ErrorMessage } from '@hookform/error-message';
import Select from './Select';
import {
  Path,
  RegisterOptions,
  UseFormRegister,
  DeepMap,
  FieldError,
  Control,
} from 'react-hook-form';
import { SelectProps } from './Select';

export type FormSelectProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  label?: Path<TFormValues>;
  options: any;
  control?: Control;
  type?: any;
} & Omit<SelectProps, 'name'>;

const FormSelect = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors = {},
  className,
  control,
  label,
  type,
  options,
  ...props
}: FormSelectProps<TFormValues>): JSX.Element => {
  const errorMessages = errors[name];
  const hasError = !!(errors && errorMessages);

  const renderSelect = () => {
    return (
      <Select
        label={label}
        name={name}
        aria-invalid={hasError}
        className={className}
        options={options}
        {...props}
        {...(register && register(name, rules))}
      />
    );
  };

  return (
    <div aria-live="polite" className="mb-3 position-relative">
      {
        <p className="mb-1">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          {!rules?.required && <span> - Optional</span>}
        </p>
      }
      {renderSelect()}
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <small className="mb-0 text-red-600">{message}</small>
        )}
      />
    </div>
  );
};

export default FormSelect;
