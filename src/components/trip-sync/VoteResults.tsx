
'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, HelpCircle, X } from 'lucide-react';
import type { UserVote } from './types';
import { cn } from '@/lib/utils';

interface VoteResultsProps {
  votes: {
    up: number;
    maybe: number;
    down: number;
  };
  userVotes?: UserVote[];
  showAvatars?: boolean;
  maxAvatars?: number;
}

export function VoteResults({ votes, userVotes = [], showAvatars = true, maxAvatars = 5 }: VoteResultsProps) {
  const totalVotes = votes.up + votes.maybe + votes.down;
  if (totalVotes === 0) {
    return (
      <div className="text-xs text-muted-foreground mt-2">No votes yet</div>
    );
  }

  const upPercentage = (votes.up / totalVotes) * 100;
  const maybePercentage = (votes.maybe / totalVotes) * 100;
  const downPercentage = (votes.down / totalVotes) * 100;

  // Group user votes by type
  const upVoters = userVotes.filter(v => v.voteType === 'up').slice(0, maxAvatars);
  const maybeVoters = userVotes.filter(v => v.voteType === 'maybe').slice(0, maxAvatars);
  const downVoters = userVotes.filter(v => v.voteType === 'down').slice(0, maxAvatars);

  return (
    <div className="w-full space-y-2 mt-2">
      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-muted flex overflow-hidden">
        {upPercentage > 0 && (
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${upPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            title={`${votes.up} love it`}
          />
        )}
        {maybePercentage > 0 && (
          <motion.div
            className="h-full bg-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${maybePercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            title={`${votes.maybe} thinking about it`}
          />
        )}
        {downPercentage > 0 && (
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${downPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            title={`${votes.down} not interested`}
          />
        )}
      </div>

      {/* Vote Counts and Avatars */}
      {showAvatars && (
        <div className="flex items-center gap-4 flex-wrap text-xs">
          {votes.up > 0 && (
            <div className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-green-500" />
              <span className="text-muted-foreground font-medium">{votes.up}</span>
              <div className="flex items-center -space-x-2 ml-1">
                {upVoters.map((vote, idx) => (
                  <Avatar key={idx} className="h-5 w-5 border-2 border-background">
                    <AvatarImage src={vote.userAvatar} alt={vote.userName} />
                    <AvatarFallback className="text-[10px]">{vote.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {votes.up > maxAvatars && (
                  <div className="h-5 w-5 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground">
                    +{votes.up - maxAvatars}
                  </div>
                )}
              </div>
            </div>
          )}
          {votes.maybe > 0 && (
            <div className="flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-yellow-500" />
              <span className="text-muted-foreground font-medium">{votes.maybe}</span>
              <div className="flex items-center -space-x-2 ml-1">
                {maybeVoters.map((vote, idx) => (
                  <Avatar key={idx} className="h-5 w-5 border-2 border-background">
                    <AvatarImage src={vote.userAvatar} alt={vote.userName} />
                    <AvatarFallback className="text-[10px]">{vote.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {votes.maybe > maxAvatars && (
                  <div className="h-5 w-5 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground">
                    +{votes.maybe - maxAvatars}
                  </div>
                )}
              </div>
            </div>
          )}
          {votes.down > 0 && (
            <div className="flex items-center gap-1.5">
              <X className="h-3.5 w-3.5 text-red-500" />
              <span className="text-muted-foreground font-medium">{votes.down}</span>
              <div className="flex items-center -space-x-2 ml-1">
                {downVoters.map((vote, idx) => (
                  <Avatar key={idx} className="h-5 w-5 border-2 border-background">
                    <AvatarImage src={vote.userAvatar} alt={vote.userName} />
                    <AvatarFallback className="text-[10px]">{vote.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {votes.down > maxAvatars && (
                  <div className="h-5 w-5 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground">
                    +{votes.down - maxAvatars}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compact view: Just counts */}
      {!showAvatars && (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {votes.up > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-green-500" />
              {votes.up}
            </span>
          )}
          {votes.maybe > 0 && (
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-yellow-500" />
              {votes.maybe}
            </span>
          )}
          {votes.down > 0 && (
            <span className="flex items-center gap-1">
              <X className="h-3 w-3 text-red-500" />
              {votes.down}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
