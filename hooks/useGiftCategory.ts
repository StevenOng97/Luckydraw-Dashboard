import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createGiftCategory,
  deleteGiftCategory,
  getAllGiftCategories,
} from '../api/GiftCategory';
import { useLoading } from '../context/LoadingContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';

function useGiftCategory() {
  const queryClient = useQueryClient();
  const { error, success } = useToast();
  const { setLoading } = useLoading();
  const { hideModal } = useModal();

  const { isLoading, data: categories } = useQuery(
    ['gift-categories'],
    getAllGiftCategories,
    {
      select: (data) => data.items,
      onError: (err) => {
        console.log('Abc');
        console.log(err);
        // error(err);
      },
    }
  );

  const { mutate: createCategory, isLoading: creating } = useMutation(
    createGiftCategory,
    {
      onSuccess(data) {
        success('Tạo thành công gift category');
        queryClient.invalidateQueries('gift-categories');
      },

      onError: (err) => {
        error(err);
      },
    }
  );

  const { mutate: deleteCategory, isLoading: deleting } = useMutation(
    deleteGiftCategory,
    {
      onSuccess(data) {
        hideModal();
        success('Xóa thành công category');
        queryClient.invalidateQueries('gift-categories');
      },

      onError: (err) => {
        error(err);
      },
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setLoading(creating);
  }, [creating]);

  useEffect(() => {
    setLoading(deleting);
  }, [deleting]);

  return {
    categories,
    createCategory,
    deleteCategory,
  };
}

export default useGiftCategory;
