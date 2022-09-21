import { UseFormReturn, FieldErrorsImpl, Control } from 'react-hook-form';

interface CommonFormProps {
  onSubmit: () => void;
  isLoading?: boolean;
  register?: UseFormReturn['register'];
  errors?: FieldErrorsImpl;
  control?: Control;
  className?: string;
  options?: any;
}

export type { CommonFormProps };
