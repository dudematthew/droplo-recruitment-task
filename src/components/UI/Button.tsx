import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  children, 
  className,
  icon,
  size = 'md',
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex flex-row items-center justify-center box-border shadow-xs transition-colors duration-200';
  
  const sizeStyles = {
    sm: 'px-3.5 py-2 gap-2 text-sm',
    md: 'px-[14px] py-[10px] text-sm gap-1 h-10 rounded-lg',
    lg: 'px-5 py-3 gap-2',
  };

  const variantStyles = {
    primary: 'bg-primary border border-primary text-white hover:bg-primary-hover hover:border-primary-hover shadow-[0px_1px_2px_rgba(16,24,40,0.05)]',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-white text-gray-600 hover:bg-gray-50',
    outline: 'bg-white border border-primary/30 text-primary hover:bg-primary/5'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
} 