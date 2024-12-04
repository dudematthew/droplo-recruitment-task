import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { NavigationFormData } from '@/types/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const schema = z.object({
  title: z.string()
    .min(1, { message: 'Tytuł jest wymagany' })
    .max(50, { message: 'Tytuł może mieć maksymalnie 50 znaków' }),
  url: z.string()
    .min(1, { message: 'URL jest wymagany' })
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
});

interface NavigationFormProps {
  onSubmit: (data: NavigationFormData) => void;
  initialData?: NavigationFormData;
  onCancel?: () => void;
}

export function NavigationForm({ onSubmit, initialData, onCancel }: NavigationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: '',
      url: ''
    },
    mode: 'onTouched',
    delayError: 500,
  });

  return (
    <div className="flex border-gray-border bg-white border rounded-lg w-full">
      <div className="flex flex-col justify-center gap-6 p-6 pr-0 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nazwa"
            placeholder="np. Promocje"
            {...register('title')}
            error={touchedFields.title ? errors.title?.message : undefined}
          />
          
          <Input
            label="Link"
            placeholder="Wklej lub wyszukaj"
            {...register('url')}
            error={touchedFields.url ? errors.url?.message : undefined}
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
              {initialData ? 'Zapisz zmiany' : 'Dodaj do menu'}
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