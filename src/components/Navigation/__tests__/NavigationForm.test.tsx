import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { NavigationForm } from '../NavigationForm';

describe('NavigationForm', () => {
  it('renders form fields correctly', () => {
    render(<NavigationForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText('Nazwa')).toBeInTheDocument();
    expect(screen.getByLabelText('Link')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(<NavigationForm onSubmit={() => {}} />);
    
    const submitButton = screen.getByText('Dodaj');
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Nazwa jest wymagana')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when valid', async () => {
    const onSubmit = vi.fn();
    render(<NavigationForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Nazwa'), {
      target: { value: 'Test Item' },
    });
    fireEvent.change(screen.getByLabelText('Link'), {
      target: { value: 'https://example.com' },
    });
    
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      const firstCallFirstArg = onSubmit.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual({
        title: 'Test Item',
        url: 'https://example.com',
      });
    });
  });
}); 