import { IFormDataType, IPattern } from '../interfaces/Auth';

const emailPattern: IPattern = {
  value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
  message: 'Sai định dạng email',
};

const signUpForm: IFormDataType[] = [
  {
    id: 'username',
    name: 'username',
    placeholder: 'Họ tên',
    type: 'text',
    rules: {
      required: 'Hãy nhập họ tên',
    },
  },
  {
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    type: 'text',
    rules: {
      required: 'Hãy nhập email',
      pattern: emailPattern,
    },
  },
  {
    id: 'password',
    name: 'password',
    placeholder: 'Mật khẩu',
    type: 'password',
    rules: {
      required: 'Hãy nhập mật khẩu',
      minLength: {
        value: 8,
        message: 'Mật khẩu chứa ít nhất 8 kí tự',
      },
    },
  },
  {
    id: 'phone',
    name: 'phone',
    placeholder: 'Số diện thoại',
    type: 'phone',
    rules: {
      required: 'Hãy nhập số điện thoại',
      minLength: {
        value: 14,
        message: 'Sai số điện thoại',
      },
    },
  },
];

const signInForm: IFormDataType[] = [
  {
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    type: 'text',
    rules: {
      required: 'Hãy nhập email',
      pattern: emailPattern,
    },
  },
  {
    id: 'password',
    name: 'password',
    placeholder: 'Mật khẩu',
    type: 'password',
    rules: {
      required: 'Hãy nhập mật khẩu',
    },
  },
];

export { signUpForm, signInForm };
