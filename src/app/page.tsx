'use client';

import { useState } from 'react';

import { NavigationForm } from '@/components/Navigation/NavigationForm';
import { NavigationList } from '@/components/Navigation/NavigationList';
import { Button } from '@/components/UI/Button';
import { initialNavigationItems } from '@/data/mockData';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [items, setItems] = useState<NavigationItem[]>(initialNavigationItems);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAdd = (data: NavigationFormData) => {
    const newItem: NavigationItem = {
      id: crypto.randomUUID(),
      ...data,
    };
    setItems([...items, newItem]);
    setIsFormVisible(false);
  };

  const handleEdit = (data: NavigationFormData) => {
    if (!editingItem) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? { ...item, ...data } : item
    ));
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleReorder = (newItems: NavigationItem[]) => {
    setItems(newItems);
  };

  const handleAddSubItem = (parentId: string, newItem: Omit<NavigationItem, 'id'>) => {
    const addSubItem = (items: NavigationItem[]): NavigationItem[] => {
      return items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [
              ...(item.children || []),
              { ...newItem, id: crypto.randomUUID() }
            ]
          };
        }
        if (item.children) {
          return {
            ...item,
            children: addSubItem(item.children)
          };
        }
        return item;
      });
    };

    setItems(addSubItem(items));
  };

  return (
    <div className="flex flex-col items-stretch gap-6 mx-auto p-6 max-w-6xl">
    
      <div className='flex flex-col justify-center items-center gap-2 border-gray-border bg-white p-6 border rounded-lg w-full'>
        <h1 className="font-bold">Menu is empty</h1>
        <p className='text-gray-500 text-sm'>There are no links in this menu yet</p>
        <Button 
          onClick={() => setIsFormVisible(true)}
          icon={<PlusCircleIcon className="w-5 h-5" />}
          className='mt-4'
        >
          Add menu item
        </Button>
      </div>

      

      {isFormVisible && (
        <div className="w-full">
          <NavigationForm
            onSubmit={handleAdd}
            onCancel={() => setIsFormVisible(false)}
          />
        </div>
      )}

      {items.length > 0 && (
        <NavigationList
          items={items}
          onReorder={handleReorder}
          onEdit={setEditingItem}
          onDelete={handleDelete}
          onAddSubItem={handleAddSubItem}
          activeItemId={editingItem?.id}
        />
      )}
    </div>
  );
}
