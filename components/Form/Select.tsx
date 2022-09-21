import React, {
  DetailedHTMLProps,
  FC,
  forwardRef,
  SelectHTMLAttributes,
} from 'react';

interface Option {
  value: string;
  label: string;
}

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  className?: string;
  options?: Option[];
} & Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'size'
>;

const Select: FC<SelectProps> = forwardRef(
  (
    {
      id,
      name,
      label,
      type = 'text',
      className = '',
      placeholder,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <select className={className} id={id} ref={ref} name={name} {...props}>
        {options.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    );
  }
);

export default Select;
