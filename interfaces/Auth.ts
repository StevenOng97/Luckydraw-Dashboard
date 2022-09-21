import { Control, FieldErrorsImpl, UseFormReturn } from 'react-hook-form';

interface IPattern {
  value: RegExp;
  message: string;
}

interface IMin {
  value: number;
  message: string;
}

interface IMax {
  value: number;
  message: string;
}
interface IMinlength {
  value: number;
  message: string;
}

interface IMaxlength {
  value: number;
  message: string;
}

interface IRule {
  required: string;
  pattern?: IPattern;
  minLength?: IMinlength;
  maxLength?: IMaxlength;
  min?: IMin;
  max?: IMax;
  valueAsNumber?: boolean;
  validate?: any;
}

interface IFormDataType {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  rules?: IRule;
}

interface AuthFormProps {
  onSubmit: () => void;
  isLoading: boolean;
  register?: UseFormReturn['register'];
  errors?: FieldErrorsImpl;
  control?: Control;
}

export type { IFormDataType, IPattern, AuthFormProps };
