import { apiClient } from "../constant/api";
export const apiSearchCategory = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.get(`/api/ChuyenMuc/get-all`, data);  
    return res?.data;
  };

  export const apiSearch = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/ChuyenMuc/search`, data);  
    return res?.data;
  };

  export const apiCreate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/ChuyenMuc/create-item`, data);  
    return res?.data;
  };

  export const apiUpdate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/ChuyenMuc/update-item`, data);  
    return res?.data;
  };
  export const apiDelete = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/ChuyenMuc/delete`, data);  
    return res?.data;
  };