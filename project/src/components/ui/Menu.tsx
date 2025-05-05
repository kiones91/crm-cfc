import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: number | string;
  className?: string;
}

interface MenuItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  children,
  align = 'left',
  width = 200,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger button */}
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className={twMerge(
            'absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
          style={{ width }}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  icon,
  children,
  className,
  disabled = false
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  return (
    <div
      className={twMerge(
        'flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        className
      )}
      onClick={handleClick}
      role="menuitem"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  );
};

export const MenuDivider: React.FC = () => {
  return <div className="h-px bg-gray-200 my-1"></div>;
};

export const MenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4" />
    </button>
  );
};