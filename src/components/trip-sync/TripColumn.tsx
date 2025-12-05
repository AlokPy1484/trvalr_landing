
'use client';

import React from 'react';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import { GripVertical, Plus, Plane, Bed, Sparkles, StickyNote } from 'lucide-react';
import type { TripColumnData, TripIdea } from './types';
import { TripIdeaCard } from './TripIdeaCard';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';

const ItemTypes = {
  CARD: 'card',
  COLUMN: 'column',
};

const columnIcons: Record<string, React.ElementType> = {
  flights: Plane,
  stays: Bed,
  activities: Sparkles,
  notes: StickyNote,
};

interface TripColumnProps {
  column: TripColumnData;
  index: number;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
}

interface DraggedItem {
  id: string;
  originalIndex: number;
  originalColumnId: string;
  type: string;
}

export function TripColumn({ column, index, moveCard, moveColumn }: TripColumnProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DraggedItem, monitor: DropTargetMonitor) {
      // Placeholder for hover logic
    },
    drop: (item: DraggedItem, monitor) => {
        if (!monitor.didDrop()) {
            moveCard(item.id, item.originalColumnId, column.id, 0); // Simplified for now
        }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.COLUMN,
    item: { type: ItemTypes.COLUMN, id: column.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // Placeholder for column move logic
    },
  });

  const ColumnIcon = columnIcons[column.id] || StickyNote;

  // Attach both drag and drop refs to the same element
  drag(drop(ref));

  return (
    <div
      ref={preview}
      className={cn(
        "w-72 flex-shrink-0 h-full flex flex-col rounded-xl bg-muted/50 transition-all",
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
    >
      <div
        ref={ref}
        className="flex items-center justify-between p-3"
      >
        <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab"/>
            <ColumnIcon className={cn("h-4 w-4", column.iconColor)} />
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <span className="text-sm text-muted-foreground">{column.ideas.length}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
            <Plus className="h-4 w-4" />
        </button>
      </div>

      <div
        className={cn(
          "flex-grow overflow-y-auto px-3 pb-3 space-y-3 transition-colors",
          isOver && canDrop && 'bg-primary/10'
        )}
      >
        <AnimatePresence>
            {column.ideas.map((idea, i) => (
                <TripIdeaCard
                    key={idea.id}
                    idea={idea}
                    index={i}
                    columnId={column.id}
                    moveCard={moveCard}
                />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
