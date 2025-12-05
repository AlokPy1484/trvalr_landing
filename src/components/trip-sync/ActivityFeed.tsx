
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Heart, HelpCircle, X, Plus, MessageCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  type: 'vote' | 'add' | 'comment';
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  targetTitle: string;
  targetCategory: string;
  timestamp: Date;
  voteType?: 'up' | 'maybe' | 'down';
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

const activityIcons = {
  vote: {
    up: Heart,
    maybe: HelpCircle,
    down: X,
  },
  add: Plus,
  comment: MessageCircle,
};

const activityColors = {
  vote: {
    up: 'text-green-500',
    maybe: 'text-yellow-500',
    down: 'text-red-500',
  },
  add: 'text-primary',
  comment: 'text-blue-500',
};

export function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return (
      <Card className="p-4">
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Recent Activity
      </h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {displayActivities.map((activity) => {
            const IconComponent = 
              activity.type === 'vote' && activity.voteType
                ? activityIcons.vote[activity.voteType]
                : activityIcons[activity.type];
            
            const colorClass = 
              activity.type === 'vote' && activity.voteType
                ? activityColors.vote[activity.voteType]
                : activityColors[activity.type];

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                  <AvatarFallback className="text-xs">
                    {activity.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className={cn('h-3.5 w-3.5 flex-shrink-0', colorClass)} />
                    <p className="text-xs text-foreground">
                      <span className="font-medium">{activity.userName}</span>
                      {' '}
                      <span className="text-muted-foreground">{activity.action}</span>
                      {' '}
                      <span className="font-medium">{activity.targetTitle}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="capitalize">{activity.targetCategory}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

