import { apiClient } from "../constant/api";
export const apiSearch = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/HoaDon/search`, data);  
    return res?.data;
  };
  export const apiCreate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/HoaDon/create-item`, data);  
    return res?.data;
  };