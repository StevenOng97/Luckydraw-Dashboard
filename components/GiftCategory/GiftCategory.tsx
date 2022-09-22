import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ItemResponse } from "../../api/GiftCategory";
import { useLoading } from "../../context/LoadingContext";
import { useModal } from "../../context/ModalContext";
import { createGiftCategoryForm } from "../../helpers/CreateGiftCategoryForm";
import Form from "../Form/Form";
import FormInput from "../Form/FormInput";
import _ from "lodash";
import useGiftCategory from "../../hooks/useGiftCategory";
interface IGiftCategoryProps {
  category: ItemResponse;
  index?: number;
  renderDeleteModal?: (category: ItemResponse) => JSX.Element;
}

const GiftCategory: FC<IGiftCategoryProps> = ({
  category,
  renderDeleteModal,
}) => {
  const { showModal } = useModal();
  const [isEditing, setEdit] = useState(false);
  const { loading } = useLoading();
  const { updateCategory } = useGiftCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (!isEditing) return;

    setValue("id", category.id);
    setValue("name", category.name);
    setValue("rate", category.rate);
  }, [isEditing]);

  const onDelete = () => {
    showModal(renderDeleteModal(category));
  };

  const useWatch = watch();

  const isModified = useMemo(
    () => !_.isEqual(category, useWatch),
    [useWatch.name, useWatch.rate]
  );

  const onSubmit = handleSubmit(async (data) => {
    const finalData = JSON.parse(JSON.stringify(data));

    try {
      if (isModified) {
        updateCategory(finalData);
      }

      setEdit(false);
      // createCategory(finalData);
    } catch (err) {}
  });

  const renderEditForm = () => (
    <Form
      loading={loading}
      submit={onSubmit}
      className="flex justify-between w-full"
      renderButton={false}
    >
      {createGiftCategoryForm.map((field, i) => {
        const { placeholder, type, rules, name, id } = field;
        return (
          <FormInput
            key={i}
            id={id}
            type={type}
            name={name}
            label={placeholder}
            className="mb-2 form-control"
            register={register}
            rules={rules}
            errors={errors}
            control={control}
            renderLabel={false}
          />
        );
      })}
      <p className="flex pt-2">
        <button className="mr-1 flex" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer fill-green-500 w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span onClick={onResetValue}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer fill-red-500 w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </p>
    </Form>
  );

  const onEdit = () => setEdit(!isEditing);

  const onResetValue = () => {
    reset();
    onEdit();
  };

  const renderEditTemplate = () => renderEditForm();

  const renderNormalTemplate = () => (
    <>
      <p className="basis-1/3">{category.name}</p>
      <p>{category.rate}%</p>

      <p className="flex">
        <span className="mr-1" onClick={onEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer fill-sky-500 w-6 h-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </span>
        <span onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer fill-red-500 w-6 h-6"
          >
            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
            <path
              fillRule="evenodd"
              d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </p>
    </>
  );

  return (
    <div className="flex mt-2 justify-between">
      {isEditing ? renderEditTemplate() : renderNormalTemplate()}
      {/* <p className="basis-1/3">{category.name}</p>
      <p>{category.rate}%</p>

      <p className="flex">
        <span className="mr-1" onClick={onEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer fill-sky-500 w-6 h-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </span>
        <span onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer fill-red-500 w-6 h-6"
          >
            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
            <path
              fillRule="evenodd"
              d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </p> */}
    </div>
  );
};

export default GiftCategory;
