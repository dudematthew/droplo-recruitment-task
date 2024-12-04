import { useState } from 'react';

import { NavigationFormData, NavigationItem } from '@/types/navigation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { MoveIcon } from '../Icons/MoveIcon';
import { NavigationForm } from './NavigationForm';

interface SortableNavigationItemProps {
  item: NavigationItem;
  onEditStart: (item: NavigationItem) => void;
  onEditSubmit: (item: NavigationItem) => void;
  onDelete: () => void;
  onAddSubItem: (parentId: string, newItem: Omit<NavigationItem, 'id'>) => void;
  isActive: boolean;
  level?: number;
}

export function SortableNavigationItem({
  item,
  onEditStart,
  onEditSubmit,
  onDelete,
  onAddSubItem,
  isActive,
  level = 0,
}: SortableNavigationItemProps) {
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddSubItem = (formData: { title: string; url: string }) => {
    onAddSubItem(item.id, formData);
    setIsAddingSubItem(false);
  };

  const handleEditSubmit = (formData: NavigationFormData) => {
    onEditSubmit({ ...item, ...formData });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="ml-6">
        <NavigationForm
          initialData={item}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center justify-between pr-5 w-full ${
          isActive ? 'bg-gray-50' : 'bg-white'
        }`}
        {...attributes}
      >
        <div 
          className="flex flex-1 items-center gap-2 px-6 py-4" 
          style={{ 
            paddingLeft: `${level * 24 + 24}px`,
            backgroundColor: level > 0 ? 'rgb(249, 250, 251)' : undefined
          }}
        >
          <button
            className="px-2 touch-none text-gray-500 hover:text-gray-600 cursor-move"
            {...listeners}
          >
            <MoveIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{item.title}</span>
            {item.url && (
              <span className="text-gray-500 text-sm">{item.url}</span>
            )}
          </div>
        </div>
        <div className="flex border-gray-200 border rounded-lg overflow-hidden">
          <button
            onClick={onDelete}
            className="border-gray-200 hover:bg-gray-50 px-4 py-2 border-r text-gray-600 text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              onEditStart(item);
            }}
            className="border-gray-200 hover:bg-gray-50 px-4 py-2 border-r text-gray-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => setIsAddingSubItem(true)}
            className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2 text-gray-600 text-sm"
          >
            Add menu item
          </button>
        </div>
      </div>

      {isAddingSubItem && (
        <div className="ml-6">
          <NavigationForm
            onSubmit={handleAddSubItem}
            onCancel={() => setIsAddingSubItem(false)}
          />
        </div>
      )}

      {item.children?.map((child) => (
        <SortableNavigationItem
          key={child.id}
          item={child}
          onEditStart={onEditStart}
          onEditSubmit={onEditSubmit}
          onDelete={onDelete}
          onAddSubItem={onAddSubItem}
          isActive={isActive}
          level={level + 1}
        />
      ))}
    </div>
  );
} 