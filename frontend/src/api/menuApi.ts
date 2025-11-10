import API_BASE_URL from './config';

export interface MenuItem {
    menuitemid: number;
    drinkcategory: string;
    menuitemname: string;
    price: number;
}

export const getAllMenuItems = async (): Promise<MenuItem[]> => {
    const response = await fetch(`${API_BASE_URL}/menu`);
    const result = await response.json();
    if (result.success) {
        // Ensure price is always a number (database might return it as string)
        return result.data.map((item: any) => ({
        ...item,
        price: Number(item.price)
        }));
    }
    throw new Error(result.error || 'Failed to fetch menu items');
};