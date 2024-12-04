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
  onDelete: (id: string) => void;
  onAddSubItem: (parentId: string, newItem: Omit<NavigationItem, 'id'>) => void;
  isActive: boolean;
  level?: number;
  isLastInLevel?: boolean;
}

export function SortableNavigationItem({
  item,
  onEditStart,
  onEditSubmit,
  onDelete,
  onAddSubItem,
  isActive,
  level = 0,
  isLastInLevel = false,
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

  const handleAddSubItem = (formData: NavigationFormData) => {
    onAddSubItem(item.id, formData);
    setIsAddingSubItem(false);
  };

  const handleEditSubmit = (formData: NavigationFormData) => {
    onEditSubmit({ ...item, ...formData });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  if (isEditing) {
    return (
      <div 
        style={{ marginLeft: level > 0 ? `${level * 64}px` : undefined }}
        className="flex flex-1"
      >
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
        style={{
          ...style,
          marginLeft: level > 0 ? `${level * 64}px` : undefined,
        }}
        className={`flex flex-1 items-center justify-between pr-5 border border-gray-200 ${
          isActive ? 'bg-gray-50' : 'bg-white'
        } ${level > 0 && isLastInLevel ? 'rounded-bl-lg' : ''}`}
        {...attributes}
      >
        <div 
          className={`flex flex-1 items-center gap-2 px-6 py-4 bg-white ${
            level > 0 ? 'bg-gray-50' : ''
          }`}
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
            onClick={handleDeleteClick}
            className="border-gray-200 hover:bg-gray-50 px-4 py-2 border-r text-gray-600 text-sm"
          >
            Usuń
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              onEditStart(item);
            }}
            className="border-gray-200 hover:bg-gray-50 px-4 py-2 border-r text-gray-600 text-sm"
          >
            Edytuj
          </button>
          <button
            onClick={() => setIsAddingSubItem(true)}
            className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2 text-gray-600 text-sm"
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {isAddingSubItem && (
        <div style={{ marginLeft: `${(level + 1) * 64}px` }}>
          <NavigationForm
            onSubmit={handleAddSubItem}
            onCancel={() => setIsAddingSubItem(false)}
          />
        </div>
      )}

      {item.children?.map((child, index) => (
        <SortableNavigationItem
          key={child.id}
          item={child}
          onEditStart={onEditStart}
          onEditSubmit={onEditSubmit}
          onDelete={onDelete}
          onAddSubItem={onAddSubItem}
          isActive={isActive}
          level={level + 1}
          isLastInLevel={index === item.children!.length - 1}
        />
      ))}
    </div>
  );
} 