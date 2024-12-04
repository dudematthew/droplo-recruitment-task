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

  // Helper function to flatten structure
  const flattenItems = (items: NavigationItem[], parentId?: string): NavigationItem[] => {
    return items.reduce<NavigationItem[]>((flat, item) => {
      const flatItem = { ...item, parent: parentId };
      const children = item.children || [];
      return [...flat, flatItem, ...flattenItems(children, item.id)];
    }, []);
  };

  // Helper function to reconstruct hierarchy
  const reconstructHierarchy = (flatItems: NavigationItem[]): NavigationItem[] => {
    const itemMap = new Map<string, NavigationItem>();
    const rootItems: NavigationItem[] = [];

    // First create a map of all items
    flatItems.forEach(item => {
      const { parent, children, ...itemWithoutParent } = item;
      itemMap.set(item.id, { ...itemWithoutParent, children: [] });
    });

    // Then reconstruct the hierarchy
    flatItems.forEach(item => {
      if (item.parent) {
        const parent = itemMap.get(item.parent);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(itemMap.get(item.id)!);
        }
      } else {
        rootItems.push(itemMap.get(item.id)!);
      }
    });

    return rootItems;
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      // Flatten the structure before changing order
      const flatItems = flattenItems(items);
      
      const oldIndex = flatItems.findIndex((item) => item.id === active.id);
      const newIndex = flatItems.findIndex((item) => item.id === over.id);
      
      const newFlatItems = arrayMove(flatItems, oldIndex, newIndex);
      
      // Reconstruct the hierarchy after changing order
      const newItems = reconstructHierarchy(newFlatItems);
      
      onReorder(newItems);
    }
  }

  // Flatten the structure for SortableContext
  const flattenedItems = flattenItems(items);

  return (
    <div className="border-gray-border bg-gray-bg border rounded-lg w-full">
      <div className="divide-y divide-gray-200">
        <DndContext
          id="navigation-list"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            id="navigation-items"
            items={flattenedItems} 
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col">
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
      </div>
      
      <div className="flex justify-start border-gray-200 p-6 border-t">
        <Button 
          variant="secondary"
        >
          Add menu item
        </Button>
      </div>
    </div>
  );
} 