import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NavigationItem } from '@/types/navigation';
import { SortableNavigationItem } from '@/components/Navigation/SortableNavigationItem';

interface NavigationListProps {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEdit: (item: NavigationItem) => void;
  onDelete: (id: string) => void;
  activeItemId?: string;
}

export function NavigationList({
  items,
  onReorder,
  onEdit,
  onDelete,
  activeItemId,
}: NavigationListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableNavigationItem
              key={item.id}
              item={item}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
              isActive={item.id === activeItemId}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
} 