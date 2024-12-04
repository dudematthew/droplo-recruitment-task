import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { SortableNavigationItem } from '../SortableNavigationItem';

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
  }),
}));

describe('SortableNavigationItem', () => {
  const mockItem = {
    id: '1',
    title: 'Test Item',
    url: 'https://example.com',
  };

  it('renders item details correctly', () => {
    render(
      <SortableNavigationItem
        item={mockItem}
        onEditStart={() => {}}
        onEditSubmit={() => {}}
        onDelete={() => {}}
        onAddSubItem={() => {}}
        isActive={false}
      />
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <SortableNavigationItem
        item={mockItem}
        onEditStart={() => {}}
        onEditSubmit={() => {}}
        onDelete={onDelete}
        onAddSubItem={() => {}}
        isActive={false}
      />
    );

    fireEvent.click(screen.getByText('Usuń'));
    expect(onDelete).toHaveBeenCalledWith(mockItem.id);
  });

  it('shows edit form when edit button is clicked', () => {
    const onEditStart = vi.fn();
    render(
      <SortableNavigationItem
        item={mockItem}
        onEditStart={onEditStart}
        onEditSubmit={() => {}}
        onDelete={() => {}}
        onAddSubItem={() => {}}
        isActive={false}
      />
    );

    fireEvent.click(screen.getByText('Edytuj'));
    expect(onEditStart).toHaveBeenCalledWith(mockItem);
  });
}); 