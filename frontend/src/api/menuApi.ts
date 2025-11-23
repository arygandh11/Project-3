import API_BASE_URL from './config';

/**
 * Menu item structure
 * Represents a single item on the menu
 */
export interface MenuItem {
    menuitemid: number;
    drinkcategory: string;
    menuitemname: string;
    price: number;
}

/**
 * Menu item ingredient structure
 * Represents an ingredient used in a menu item
 */
export interface MenuItemIngredient {
    ingredientid: number;
    ingredientname: string;
    ingredientqty: number;
}

/**
 * Fetch all menu items
 * @returns Promise resolving to an array of menu items
 * Note: Prices are converted to numbers to handle potential string returns from database
 * @throws Error if the API request fails
 */
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

/**
 * Fetch ingredients for a specific menu item
 * @param menuItemId - The ID of the menu item
 * @returns Promise resolving to an array of ingredients
 * @throws Error if the API request fails
 */
export const getMenuItemIngredients = async (menuItemId: number): Promise<MenuItemIngredient[]> => {
    const response = await fetch(`${API_BASE_URL}/menu/${menuItemId}/ingredients`);
    const result = await response.json();
    if (result.success) {
        return result.data;
    }
    throw new Error(result.error || 'Failed to fetch menu item ingredients');
};