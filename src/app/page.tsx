'use client';

import { useState } from 'react';
import { NavigationList } from '@/components/Navigation/NavigationList';
import { NavigationForm } from '@/components/Navigation/NavigationForm';
import { NavigationItem, NavigationFormData } from '@/types/navigation';
import { Button } from '@/components/UI/Button';
import { initialNavigationItems } from '@/data/mockData';

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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Zarządzanie nawigacją</h1>
        <Button onClick={() => setIsFormVisible(true)}>
          Dodaj element
        </Button>
      </div>

      {(isFormVisible || editingItem) && (
        <div className="mb-6">
          <NavigationForm
            onSubmit={editingItem ? handleEdit : handleAdd}
            initialData={editingItem || undefined}
            onCancel={() => {
              setIsFormVisible(false);
              setEditingItem(null);
            }}
          />
        </div>
      )}

      <NavigationList
        items={items}
        onReorder={handleReorder}
        onEdit={setEditingItem}
        onDelete={handleDelete}
        activeItemId={editingItem?.id}
      />
    </div>
  );
}
