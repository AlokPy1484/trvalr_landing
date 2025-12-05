
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  MoreHorizontal, 
  Plane, 
  Hotel, 
  UtensilsCrossed, 
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import type { TripIdea } from './types';
import { VoteButtons } from './VoteButtons';
import { VoteResults } from './VoteResults';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ItemTypes = {
  CARD: 'card',
};

interface TripIdeaCardProps {
  idea: TripIdea;
  index: number;
  columnId: string;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
  currentUserId?: string;
  onVote?: (ideaId: string, voteType: 'up' | 'maybe' | 'down') => void;
  isInMostLiked?: boolean;
}

interface DraggedItem {
  id: string;
  originalIndex: number;
  originalColumnId: string;
  type: string;
}

const categoryIcons = {
  flights: Plane,
  stays: Hotel,
  restaurants: UtensilsCrossed,
  activities: MapPin,
  notes: MessageCircle,
};

export function TripIdeaCard({ 
  idea, 
  index, 
  columnId, 
  moveCard, 
  currentUserId,
  onVote,
  isInMostLiked = false
}: TripIdeaCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentVote, setCurrentVote] = useState<'up' | 'maybe' | 'down' | null>(
    idea.userVotes?.find(v => v.userId === currentUserId)?.voteType || null
  );

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id: idea.id, originalIndex: index, originalColumnId: columnId, type: ItemTypes.CARD }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DraggedItem, monitor) {
      if (!ref.current) {
        return;
      }
    },
  });

  drag(drop(ref));

  const handleVote = (type: 'up' | 'maybe' | 'down') => {
    const newVote = currentVote === type ? null : type;
    setCurrentVote(newVote);
    if (onVote) {
      onVote(idea.id, type);
    }
  };

  const CategoryIcon = categoryIcons[idea.category] || MapPin;
  const totalVotes = idea.votes.up + idea.votes.maybe + idea.votes.down;
  const consensusPercentage = totalVotes > 0 ? (idea.votes.up / totalVotes) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={preview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="group relative"
    >
      <Card 
        ref={ref} 
        className={cn(
          "bg-card shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden",
          isInMostLiked && "ring-2 ring-primary/20",
          idea.isNew && "ring-2 ring-primary/40"
        )}
      >
        {/* Header with rank, new badge, and menu */}
        <div className="flex items-start justify-between p-3 pb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {idea.rank !== undefined && (
              <div className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                idea.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {idea.rank}
              </div>
            )}
            {idea.isNew && (
              <Badge variant="default" className="text-[10px] px-1.5 py-0 bg-primary/90">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                New
              </Badge>
            )}
            {isInMostLiked && consensusPercentage >= 50 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-500/50 text-green-500">
                <TrendingUp className="h-2.5 w-2.5 mr-1" />
                Consensus
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        {idea.image && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image 
              src={idea.image.src} 
              alt={idea.title} 
              fill 
              className="object-cover" 
              data-ai-hint={idea.image.aiHint} 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {isInMostLiked && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-primary/90 text-primary-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Top Pick
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-3 space-y-3">
          {/* Title and Category */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CategoryIcon className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm text-foreground line-clamp-1">{idea.title}</h4>
            </div>
            {idea.content && (
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{idea.content}</p>
            )}
          </div>

          {/* Metadata */}
          {idea.metadata && (
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {idea.metadata.price && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{idea.metadata.price}</span>
                </div>
              )}
              {idea.metadata.provider && (
                <div className="flex items-center gap-1">
                  <span>{idea.metadata.provider}</span>
                </div>
              )}
              {idea.metadata.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{idea.metadata.duration}</span>
                </div>
              )}
              {idea.metadata.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span>{idea.metadata.rating}</span>
                </div>
              )}
            </div>
          )}

          {/* Contributor */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Added by</span>
            <Avatar className="h-5 w-5">
              <AvatarImage src={idea.contributorAvatar} alt={idea.contributorName} />
              <AvatarFallback className="text-[10px]">{idea.contributorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{idea.contributorName}</span>
          </div>

          {/* Vote Results */}
          <VoteResults 
            votes={idea.votes} 
            userVotes={idea.userVotes}
            showAvatars={!isExpanded}
          />

          {/* Vote Buttons */}
          <div className="pt-2 border-t border-border/60">
            <VoteButtons 
              onVote={handleVote} 
              currentVote={currentVote}
              compact={true}
            />
          </div>

          {/* Comments */}
          {idea.comments > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs h-7"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              {idea.comments} {idea.comments === 1 ? 'comment' : 'comments'}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
