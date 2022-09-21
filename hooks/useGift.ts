import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createGift,
  deleteGift,
  getAllGifts,
} from '../api/Gifts';
import { useLoading } from '../context/LoadingContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';

function useGift() {
  const queryClient = useQueryClient();
  const { error, success } = useToast();
  const { setLoading } = useLoading();
  const { hideModal } = useModal();

  const { isLoading, data: gifts } = useQuery(
    ['gifts'],
    getAllGifts,
    {
      select: (data) => data.items,
      onError: (err) => {
        console.log('Abc');
        console.log(err);
        // error(err);
      },
    }
  );

  const { mutate: createBatchGifts, isLoading: creating } = useMutation(
    createGift,
    {
      onSuccess(data) {
        success('Thêm gifts thành công');
        queryClient.invalidateQueries('gifts');
        // queryClient.invalidateQueries('gift-categories');
      },

      onError: (err) => {
        error(err);
      },
    }
  );

  // const { mutate: deleteCategory, isLoading: deleting } = useMutation(
  //   deleteGift,
  //   {
  //     onSuccess(data) {
  //       hideModal();
  //       success('Xóa thành công category');
  //       queryClient.invalidateQueries('gifts');
  //     },

  //     onError: (err) => {
  //       error(err);
  //     },
  //   }
  // );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setLoading(creating);
  }, [creating]);

  // useEffect(() => {
  //   setLoading(deleting);
  // }, [deleting]);

  return {
    gifts,
    createBatchGifts,
    // deleteCategory,
  };
}

export default useGift;
