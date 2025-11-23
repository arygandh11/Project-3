import { useState, useEffect, useMemo } from 'react';
import { getAllMenuItems } from '../api/menuApi';
import type { MenuItem } from '../api/menuApi';

/**
 * Menu Board View component
 * Minimal display of menu items organized by category
 */
function MenuBoardView() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Group menu items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};
    menuItems.forEach(item => {
      if (!grouped[item.drinkcategory]) {
        grouped[item.drinkcategory] = [];
      }
      grouped[item.drinkcategory].push(item);
    });
    return grouped;
  }, [menuItems]);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const items = await getAllMenuItems();
      setMenuItems(items);
    } catch (err) {
      console.error('Error loading menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-center bg-white">
        <h1 className="text-2xl font-normal">Menu Board</h1>
        <p className="mt-5 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Menu</h1>
      
      <div className="max-w-6xl mx-auto">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.menuitemid} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{item.menuitemname}</span>
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuBoardView;

