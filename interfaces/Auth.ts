import { Control, FieldErrorsImpl, UseFormReturn } from 'react-hook-form';

interface IPattern {
  value: RegExp;
  message: string;
}

interface IMinlength {
  value: number;
  message: string;
}

interface IRule {
  required: string;
  pattern?: IPattern;
  minLength?: IMinlength;
}

interface IFormDataType {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  rules: IRule;
}

interface AuthFormProps {
  onSubmit: () => void;
  isLoading: boolean;
  register?: UseFormReturn['register'];
  errors?: FieldErrorsImpl;
  control?: Control;
}

export type { IFormDataType, IPattern, AuthFormProps };
