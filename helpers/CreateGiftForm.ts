import { IFormDataType, IPattern } from '../interfaces/Auth';

const ratePattern: IPattern = {
  value: new RegExp('^(0|[1-9][0-9]*)$'),
  message: 'Vui lòng nhập số',
};

const createGiftForm: IFormDataType[] = [
  {
    id: 'giftCategoryId',
    name: 'giftCategoryId',
    placeholder: 'Chọn quà',
    type: 'text',
    rules: {
      required: 'Hãy chọn quà',
    },
  },
  {
    id: 'number',
    name: 'number',
    placeholder: 'Số lượng quà thêm vào kho',
    type: 'text',
    rules: {
      required: 'Hãy nhập số lượng quà',
      valueAsNumber: true,
      validate: (value) => (Number.isNaN(value) ? ratePattern.message : null),
      min: {
        value: 0,
        message: 'Số lượng thấp nhất là 0',
      },
      // max: {
      //   value: 100,
      //   message: 'Rate cao nhất là 100%',
      // },
    },
  },
];

export { createGiftForm };
