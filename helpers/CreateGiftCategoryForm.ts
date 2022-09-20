import { IFormDataType, IPattern } from '../interfaces/Auth';

const ratePattern: IPattern = {
  value: new RegExp('^(0|[1-9][0-9]*)$'),
  message: 'Vui lòng nhập số',
};

const createGiftCategoryForm: IFormDataType[] = [
  {
    id: 'name',
    name: 'name',
    placeholder: 'Tên quà',
    type: 'text',
    rules: {
      required: 'Hãy nhập tên quà muốn thêm',
    },
  },
  {
    id: 'rate',
    name: 'rate',
    placeholder: 'Rate quay trúng',
    type: 'text',
    rules: {
      required: 'Hãy nhập số rate',
      pattern: ratePattern,
      min: {
        value: 1,
        message: 'Rate thấp nhất là 1%',
      },
      max: {
        value: 100,
        message: 'Rate cao nhất là 100%',
      },
    },
  },
];

export { createGiftCategoryForm };
