

import { SortableNavigationItem } from '@/components/Navigation/SortableNavigationItem';
import { NavigationItem } from '@/types/navigation';
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
  onEdit: (item: NavigationItem) => void;
  onDelete: (id: string) => void;
  onAddSubItem: (parentId: string, newItem: Omit<NavigationItem, 'id'>) => void;
  activeItemId?: string;
}

export function NavigationList({
  items,
  onReorder,
  onEdit,
  onDelete,
  onAddSubItem,
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
    <div className="border-gray-border bg-gray-50 border rounded-lg w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id}>
                <SortableNavigationItem
                  item={item}
                  onEdit={() => onEdit(item)}
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
      
      <div className="flex justify-start border-gray-200 bg-gray-50 p-6 border-t">
        <Button 
          variant="secondary"
        >
          Dodaj pozycję menu
        </Button>
      </div>
    </div>
  );
} 