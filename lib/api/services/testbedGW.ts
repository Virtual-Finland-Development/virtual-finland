
import { DataProduct } from '@/lib/backend/services/testbed-gw/DataProductRouter';
import apiClient from '../api-client';

export function getDataProduct(dataProduct: DataProduct, inputData?: any, dataSource?: string) {
  return apiClient.post(`/api/testbed-gw/${dataProduct}${dataSource ? `?source=${dataSource}` : ''}`, inputData);
}