import axios, { AxiosError, AxiosResponse } from 'axios';
import Constants from '../constants';
import { storage } from '../helpers/helper';

export interface CreateBatchGiftsInCategoryRequest {
  giftCategoryId?: string;
  number?: number;
}

export interface GiftStruct {
  id?: string;
  status?: string;
  claimedAt?: Date;
  giftCategoryId?: string;
  spinId?: string;
  userId?: string;
}

export interface CreateBatchGiftsInCategoryResponse {
  status?: number;
  error?: string[];
}

export interface GetAllGiftsRequest {
  giftCategoryId?: string;
  status?: string;
  spinId?: string;
  userId?: string;
}

export interface GetAllGiftsResponse {
  status?: number;
  error?: string[];
  items?: GiftStruct[];
  meta?: any;
}

const endpoint = 'gifts';

export async function handleApiResponse(response: AxiosResponse) {
  if (response.data) {
    return response.data;
  } else {
    throw new Error('Internal Error');
  }
}

export async function handleApiError(err: AxiosError) {
  console.log('err', err);
}

const fetcherWithToken: any = (url: string, method: string, data) => {
  return axios({
    method,
    url,
    data: method !== 'get' ? data : undefined,
    headers: { Authorization: 'Bearer ' + storage.getToken() },
  })
    .then(handleApiResponse)
    .catch(handleApiError);
};

export async function createGift(
  data: CreateBatchGiftsInCategoryRequest
): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'post', data);
}

export async function deleteGift(id: string): Promise<any> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'delete', { id });
}

export async function getAllGifts(): Promise<GetAllGiftsResponse> {
  return fetcherWithToken(`${Constants.API_URL}/${endpoint}`, 'get');
}
