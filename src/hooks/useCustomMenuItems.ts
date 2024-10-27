import { useState, useEffect } from 'react';
import { MenuItem } from '../types/config';

const defaultMenuItems: MenuItem[] = [
  {
    id: 'external-system',
    label: 'External System',
    type: 'iframe',
    path: '/external/system',
    icon: 'ExternalLink',
    position: 'bottom'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    type: 'external',
    path: 'https://docs.example.com',
    icon: 'Book',
    target: '_blank',
    position: 'bottom'
  }
];

export function useCustomMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        // This would normally fetch from your API
        // For now, we'll use the default items
        setMenuItems(defaultMenuItems);
      } catch (error) {
        console.error('Failed to load custom menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  return { menuItems, loading };
}