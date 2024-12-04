import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { NavigationFormData } from '@/types/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const schema = z.object({
  title: z.string({
    required_error: "Nazwa jest wymagana",
    invalid_type_error: "Nazwa musi być tekstem"
  })
    .trim()
    .min(1, { message: 'Nazwa jest wymagana' })
    .max(50, { message: 'Nazwa nie może przekraczać 50 znaków' }),
  url: z.string({
    invalid_type_error: "URL musi być tekstem"
  })
    .trim()
    .regex(
      /^https?:\/\/.+/,
      { message: 'URL musi zaczynać się od http:// lub https://' }
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
      { message: 'Nieprawidłowy format URL' }
    )
    .optional()
    .or(z.literal(''))
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
    formState: { errors, isSubmitting },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: '',
      url: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  return (
    <div className="flex border-gray-border bg-white border rounded-lg w-full">
      <div className="flex flex-col justify-center gap-6 p-6 pr-0 w-full">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          role="form"
          noValidate
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label="Nazwa"
                placeholder="np. Promocje"
                type="text"
                {...field}
                error={errors.title?.message}
              />
            )}
          />
          
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <Input
                label="Link"
                placeholder="Wklej lub wyszukaj"
                type="url"
                {...field}
                error={errors.url?.message}
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
                Anuluj
              </Button>
            )}
            <Button 
              type="submit" 
              variant="outline"
              disabled={isSubmitting}
            >
              {initialData ? 'Zapisz zmiany' : 'Dodaj'}
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