import { promises } from "dns";
import { apiClient } from "../constant/api";
export const apiSearch = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/Khach/search`, data);  
    return res?.data;
  };
  export const apiCreate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/Khach/create-item`, data);  
    return res?.data;
  };

  export const apiUpdate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/Khach/update-item`, data);  
    return res?.data;
  };

  export const apiGetById = async (
    id: any,
  ): Promise<any> => {
    const res = await apiClient?.get(`/api/Khach/get-by-id/`+ id);  
    return res?.data;
  };

  export const apiDelete = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/Khach/delete`, data);  
    return res?.data;
  };
