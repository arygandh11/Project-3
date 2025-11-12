import API_BASE_URL from './config';

export interface InventoryItem {
  ingredientid: number;
  ingredientname: string;
  ingredientcount: number;
}

export interface AddInventoryItemData {
  ingredientname: string;
  ingredientcount: number;
}

export const getAllInventory = async (): Promise<InventoryItem[]> => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  const result = await response.json();
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error || 'Failed to fetch inventory');
};

export const addInventoryItem = async (itemData: AddInventoryItemData): Promise<InventoryItem> => {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData)
  });

  const result = await response.json();
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error || 'Failed to add inventory item');
};

export const updateInventoryQuantity = async (id: number, newQuantity: number): Promise<InventoryItem> => {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}/quantity`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newQuantity })
  });

  const result = await response.json();
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error || 'Failed to update inventory quantity');
};

