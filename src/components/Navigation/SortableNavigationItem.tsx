import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavigationItem } from '@/types/navigation';

interface SortableNavigationItemProps {
  item: NavigationItem;
  onEdit: () => void;
  onDelete: () => void;
  isActive: boolean;
}

export function SortableNavigationItem({
  item,
  onEdit,
  onDelete,
  isActive,
}: SortableNavigationItemProps) {
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

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${
        isActive ? 'border-2 border-blue-500' : ''
      }`}
      {...attributes}
    >
      <div className="flex items-center gap-4">
        <button
          className="cursor-move touch-none dark:text-gray-300"
          {...listeners}
        >
          ⋮⋮
        </button>
        <div className="flex flex-col">
          <span className="font-medium dark:text-white">{item.title}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{item.url}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded"
        >
          Edytuj
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded"
        >
          Usuń
        </button>
      </div>
    </li>
  );
} 