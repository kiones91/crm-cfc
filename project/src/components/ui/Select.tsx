// src/components/ui/Select.tsx
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  fullWidth?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, fullWidth = false, children, ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : ''
    const id = React.useId()

    return (
      <div className={twMerge('mb-4', widthClass)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={twMerge(
            'block rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary-500 focus:ring-primary-500',
            widthClass,
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
