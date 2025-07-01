import React, { forwardRef } from 'react';

// Simple className utility
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Button variants configuration
const buttonVariants = {
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500'
  },
  sizes: {
    small: 'h-9 px-3 text-xs',
    medium: 'h-10 px-4 py-2 text-sm',
    large: 'h-11 px-8 text-base'
  }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants;
  size?: keyof typeof buttonVariants.sizes;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'medium', fullWidth, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseClasses = buttonVariants.base;
    const variantClasses = buttonVariants.variants[variant];
    const sizeClasses = buttonVariants.sizes[size];
    const widthClasses = fullWidth ? 'w-full' : '';
    
    const buttonClasses = cn(
      baseClasses,
      variantClasses,
      sizeClasses,
      widthClasses,
      className
    );

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
