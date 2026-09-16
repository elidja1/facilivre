import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'degraded' | 'pending';
  label?: string;
  className?: string;
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className,
  pulse = true,
}) => {
  const dotColors = {
    online: 'bg-emerald-500',
    offline: 'bg-rose-500',
    degraded: 'bg-amber-500',
    pending: 'bg-blue-500',
  };

  const pingColors = {
    online: 'bg-emerald-400',
    offline: 'bg-rose-400',
    degraded: 'bg-amber-400',
    pending: 'bg-blue-400',
  };

  return (
    <div className={twMerge('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2.5 w-2.5">
        {pulse && (
          <span
            className={clsx(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              pingColors[status]
            )}
          />
        )}
        <span className={clsx('relative inline-flex rounded-full h-2.5 w-2.5', dotColors[status])} />
      </span>
      {label && (
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 capitalize">
          {label}
        </span>
      )}
    </div>
  );
};
