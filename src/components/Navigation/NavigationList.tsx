import { useState } from 'react';

import { NavigationForm } from '@/components/Navigation/NavigationForm';
import { SortableNavigationItem } from '@/components/Navigation/SortableNavigationItem';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import {
    closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { Button } from '../UI/Button';

interface NavigationListProps {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEditStart: (item: NavigationItem) => void;
  onEditSubmit: (item: NavigationItem) => void;
  onDelete: (id: string) => void;
  onAddSubItem: (parentId: string, newItem: Omit<NavigationItem, 'id'>) => void;
  onAdd: (data: NavigationFormData) => void;
  activeItemId?: string;
}

export function NavigationList({
  items,
  onReorder,
  onEditStart,
  onEditSubmit,
  onDelete,
  onAddSubItem,
  onAdd,
  activeItemId,
}: NavigationListProps) {
  const [isAddingItem, setIsAddingItem] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get all item IDs for the SortableContext
  const getItemIds = (items: NavigationItem[]): string[] => {
    return items.reduce<string[]>((ids, item) => {
      return [
        ...ids,
        item.id,
        ...(item.children ? getItemIds(item.children) : [])
      ];
    }, []);
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const reorderItems = (items: NavigationItem[], activeId: string, overId: string): NavigationItem[] => {
      const oldIndex = items.findIndex(item => item.id === activeId);
      const newIndex = items.findIndex(item => item.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(items, oldIndex, newIndex);
      }

      // If not found at this level, search in children
      return items.map(item => {
        if (item.children) {
          return {
            ...item,
            children: reorderItems(item.children, activeId, overId)
          };
        }
        return item;
      });
    };

    const newItems = reorderItems(items, active.id, over.id);
    onReorder(newItems);
  }

  return (
    <div className="border-gray-border bg-gray-bg border rounded-lg w-full">
      <div className="divide-y divide-gray-200">
        <DndContext
          id="navigation-dnd-context"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            id="navigation-sortable-context"
            items={getItemIds(items)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.id}>
                  <SortableNavigationItem
                    item={item}
                    onEditStart={onEditStart}
                    onEditSubmit={onEditSubmit}
                    onDelete={() => onDelete(item.id)}
                    onAddSubItem={onAddSubItem}
                    isActive={item.id === activeItemId}
                    level={0}
                  />
                </li>
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
      
      <div className="flex justify-start border-gray-200 p-6 border-t">
        {isAddingItem ? (
          <NavigationForm
            onSubmit={(data) => {
              onAdd(data);
              setIsAddingItem(false);
            }}
            onCancel={() => setIsAddingItem(false)}
          />
        ) : (
          <div className="flex justify-start">
            <Button 
              variant="secondary"
              onClick={() => setIsAddingItem(true)}
            >
              Add menu item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 