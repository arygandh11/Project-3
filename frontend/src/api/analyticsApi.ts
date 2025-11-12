import API_BASE_URL from './config';

export interface ProductUsageData {
  [menuitemname: string]: number;
}

export interface SalesData {
  totalSales: number;
}

export const getProductUsageData = async (): Promise<ProductUsageData> => {
  const response = await fetch(`${API_BASE_URL}/analytics/product-usage`);
  const result = await response.json();
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error || 'Failed to fetch product usage data');
};

export const getTotalSales = async (startDate: string, endDate: string): Promise<SalesData> => {
  const response = await fetch(`${API_BASE_URL}/analytics/sales?startDate=${startDate}&endDate=${endDate}`);
  const result = await response.json();
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error || 'Failed to fetch sales data');
};

