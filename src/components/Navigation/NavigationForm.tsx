import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { NavigationFormData } from '@/types/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const schema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be text"
  })
    .trim()
    .min(1, { message: 'Title is required' })
    .max(50, { message: 'Title cannot exceed 50 characters' }),
  url: z.string({
    required_error: "URL is required",
    invalid_type_error: "URL must be text"
  })
    .trim()
    .min(1, { message: 'URL is required' })
    .regex(
      /^https?:\/\/.+/,
      { message: 'URL must start with http:// or https://' }
    )
    .refine(
      (value) => {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Invalid URL format' }
    )
});

interface NavigationFormProps {
  onSubmit: (data: NavigationFormData) => void;
  initialData?: NavigationFormData;
  onCancel?: () => void;
}

export function NavigationForm({ onSubmit, initialData, onCancel }: NavigationFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, isDirty },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: '',
      url: ''
    },
    mode: 'onTouched',
  });

  return (
    <div className="flex border-gray-border bg-white border rounded-lg w-full">
      <div className="flex flex-col justify-center gap-6 p-6 pr-0 w-full">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label="Name"
                placeholder="e.g. Products"
                type="text"
                {...field}
                error={isDirty && touchedFields.title ? errors.title?.message : undefined}
              />
            )}
          />
          
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <Input
                label="URL"
                placeholder="Paste or search"
                type="url"
                {...field}
                error={isDirty && touchedFields.url ? errors.url?.message : undefined}
              />
            )}
          />

          <div className="flex justify-start gap-3 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              variant="outline"
              disabled={isSubmitting}
            >
              {initialData ? 'Save changes' : 'Add to menu'}
            </Button>
          </div>
        </form>
      </div>

      <div className="flex justify-between items-start p-6">
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
} 