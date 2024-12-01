import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavigationFormData } from '@/types/navigation';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const schema = z.object({
  title: z.string()
    .min(1, 'Tytuł jest wymagany')
    .max(50, 'Tytuł może mieć maksymalnie 50 znaków'),
  url: z.string()
    .min(1, 'URL jest wymagany')
    .url('Nieprawidłowy format URL'),
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
    formState: { errors },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Tytuł"
        {...register('title')}
        error={errors.title?.message}
      />
      
      <Input
        label="URL"
        {...register('url')}
        error={errors.url?.message}
      />

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Anuluj
          </Button>
        )}
        <Button type="submit" variant="primary">
          {initialData ? 'Zapisz' : 'Dodaj'}
        </Button>
      </div>
    </form>
  );
} 