
'use client';

import { Button } from '@/components/ui/button';
import { Heart, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
  onVote: (type: 'up' | 'maybe' | 'down') => void;
  currentVote?: 'up' | 'maybe' | 'down' | null;
  showLabels?: boolean;
  compact?: boolean;
}

export function VoteButtons({ onVote, currentVote, showLabels = false, compact = false }: VoteButtonsProps) {
  const buttons = [
    {
      type: 'up' as const,
      label: 'Love it',
      icon: Heart,
      className: 'hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-500',
      activeClassName: 'bg-green-500/20 border-green-500/50 text-green-500',
      ariaLabel: 'Vote: Love it',
    },
    {
      type: 'maybe' as const,
      label: 'Thinking about it',
      icon: HelpCircle,
      className: 'hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-yellow-500',
      activeClassName: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500',
      ariaLabel: 'Vote: Thinking about it',
    },
    {
      type: 'down' as const,
      label: 'Not interested',
      icon: X,
      className: 'hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500',
      activeClassName: 'bg-red-500/20 border-red-500/50 text-red-500',
      ariaLabel: 'Vote: Not interested',
    },
  ];

  return (
    <div className={cn('flex items-center gap-2', compact && 'gap-1')}>
      {buttons.map(({ type, label, icon: Icon, className, activeClassName, ariaLabel }) => {
        const isActive = currentVote === type;
        return (
          <Button
            key={type}
            variant="outline"
            size={compact ? 'icon' : 'sm'}
            className={cn(
              compact ? 'h-8 w-8' : 'h-9 px-3',
              'rounded-full border transition-all',
              className,
              isActive && activeClassName
            )}
            onClick={() => onVote(type)}
            aria-label={ariaLabel}
            aria-pressed={isActive}
          >
            <Icon className={cn('h-4 w-4', !compact && 'mr-1.5')} />
            {showLabels && !compact && (
              <span className="text-xs font-medium">{label}</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
