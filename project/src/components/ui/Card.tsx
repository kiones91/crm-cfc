import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={twMerge(
        'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children }: CardHeaderProps) => {
  return (
    <div
      className={twMerge(
        'p-4 border-b border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }: CardTitleProps) => {
  return (
    <h3
      className={twMerge(
        'text-lg font-semibold text-gray-900',
        className
      )}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children }: CardDescriptionProps) => {
  return (
    <p
      className={twMerge(
        'text-sm text-gray-500 mt-1',
        className
      )}
    >
      {children}
    </p>
  );
};

const CardContent = ({ className, children }: CardContentProps) => {
  return (
    <div
      className={twMerge(
        'p-4',
        className
      )}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ className, children }: CardFooterProps) => {
  return (
    <div
      className={twMerge(
        'p-4 border-t border-gray-200 bg-gray-50',
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };