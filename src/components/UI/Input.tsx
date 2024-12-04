import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const id = props.name || Math.random().toString(36);

    return (
      <div className="flex flex-col gap-2">
        <label 
          htmlFor={id} 
          className="font-medium text-gray-700 text-sm"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input'; 