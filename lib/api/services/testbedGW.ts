
import apiClient from '../api-client';

export function getDataProduct(dataProduct: string, data?: any, dataSource?: string) {
  return apiClient.post(`/api/testbed-gw/${dataProduct}${dataSource ? `?source=${dataSource}` : ''}`, data);
}