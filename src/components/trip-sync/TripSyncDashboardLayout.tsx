
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Calendar, 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  Plus,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { TripColumnData, Member, TripIdea, SortOption, FilterOption } from './types';
import { TripIdeaCard } from './TripIdeaCard';
import { InviteMemberDialog } from './InviteMemberDialog';
import { ActivityFeed, type ActivityItem } from './ActivityFeed';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TripSyncDashboardLayoutProps {
  tripName: string;
  members: Member[];
  columns: TripColumnData[];
  setColumns: React.Dispatch<React.SetStateAction<TripColumnData[]>>;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  currentUserId?: string;
  onVote?: (ideaId: string, voteType: 'up' | 'maybe' | 'down') => void;
  activities?: ActivityItem[];
}

export function TripSyncDashboardLayout({
  tripName,
  members,
  columns,
  setColumns,
  currentUserId = '1',
  onVote,
  activities = [],
}: TripSyncDashboardLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(columns[0]?.id || 'flights');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('most-voted');
  const [filterOption, setFilterOption] = useState<FilterOption>({});
  const [showFilters, setShowFilters] = useState(false);

  const activeColumn = useMemo(() => {
    return columns.find(column => column.id === activeTab);
  }, [activeTab, columns]);

  // Filter and sort ideas
  const processedIdeas = useMemo(() => {
    if (!activeColumn) return { mostLiked: [], others: [] };

    let filtered = [...activeColumn.ideas];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(idea => 
        idea.title.toLowerCase().includes(query) ||
        idea.content?.toLowerCase().includes(query) ||
        idea.metadata?.provider?.toLowerCase().includes(query) ||
        idea.metadata?.location?.toLowerCase().includes(query)
      );
    }

    // Apply contributor filter
    if (filterOption.contributor) {
      filtered = filtered.filter(idea => idea.contributorId === filterOption.contributor);
    }

    // Apply sorting
    switch (sortOption) {
      case 'most-voted':
        filtered.sort((a, b) => {
          const aTotal = a.votes.up + a.votes.maybe + a.votes.down;
          const bTotal = b.votes.up + b.votes.maybe + b.votes.down;
          if (bTotal !== aTotal) return bTotal - aTotal;
          return b.votes.up - a.votes.up;
        });
        break;
      case 'most-recent':
        filtered.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.metadata?.price?.replace(/[^0-9.]/g, '') || '0');
          const bPrice = parseFloat(b.metadata?.price?.replace(/[^0-9.]/g, '') || '0');
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.metadata?.price?.replace(/[^0-9.]/g, '') || '0');
          const bPrice = parseFloat(b.metadata?.price?.replace(/[^0-9.]/g, '') || '0');
          return bPrice - aPrice;
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Assign ranks
    filtered.forEach((idea, index) => {
      idea.rank = index + 1;
    });

    // Separate most liked (top 3 with highest "love it" votes) and others
    const sortedByLove = [...filtered].sort((a, b) => {
      const aConsensus = a.votes.up / (a.votes.up + a.votes.maybe + a.votes.down || 1);
      const bConsensus = b.votes.up / (b.votes.up + b.votes.maybe + b.votes.down || 1);
      if (bConsensus !== aConsensus) return bConsensus - aConsensus;
      return b.votes.up - a.votes.up;
    });

    const mostLiked = sortedByLove
      .filter(idea => {
        const total = idea.votes.up + idea.votes.maybe + idea.votes.down;
        return total > 0 && idea.votes.up >= 2; // At least 2 "love it" votes
      })
      .slice(0, 3)
      .map(idea => ({ ...idea, isInMostLiked: true }));

    const others = filtered.filter(idea => 
      !mostLiked.some(ml => ml.id === idea.id)
    );

    return { mostLiked, others };
  }, [activeColumn, searchQuery, sortOption, filterOption]);

  const handleVote = (ideaId: string, voteType: 'up' | 'maybe' | 'down') => {
    if (onVote) {
      onVote(ideaId, voteType);
    }
    // Update local state optimistically
    setColumns(prev => prev.map(column => ({
      ...column,
      ideas: column.ideas.map(idea => {
        if (idea.id === ideaId) {
          const currentUserVote = idea.userVotes?.find(v => v.userId === currentUserId);
          const newVotes = { ...idea.votes };
          
          // Remove old vote
          if (currentUserVote) {
            newVotes[currentUserVote.voteType] = Math.max(0, newVotes[currentUserVote.voteType] - 1);
          }
          
          // Add new vote (or remove if same vote clicked)
          const isRemoving = currentUserVote?.voteType === voteType;
          if (!isRemoving) {
            newVotes[voteType] = (newVotes[voteType] || 0) + 1;
          }

          const newUserVotes = idea.userVotes?.filter(v => v.userId !== currentUserId) || [];
          if (!isRemoving) {
            const currentUser = members.find(m => m.id === currentUserId);
            if (currentUser) {
              newUserVotes.push({
                userId: currentUserId,
                userName: currentUser.name,
                userAvatar: currentUser.avatarUrl,
                voteType,
                timestamp: new Date(),
              });
            }
          }

          return {
            ...idea,
            votes: newVotes,
            userVotes: newUserVotes,
          };
        }
        return idea;
      }),
    })));
  };

  const currentUser = members.find(m => m.id === currentUserId);

  return (
    <div className="flex h-full w-full bg-transparent text-foreground">
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-card/50 backdrop-blur-lg border-r border-border/60 flex flex-col">
        <div className="p-4 border-b border-border/60">
          <Button variant="ghost" className="w-full justify-between h-auto p-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-lg">🇫🇷</span>
              </div>
              <span className="font-semibold text-sm truncate">{tripName}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        
        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Members ({members.length})
              </h3>
            </div>
            <div className="space-y-3">
              {members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.aiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate">{member.name}</span>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsInviteOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2"/>
              Invite Member
            </Button>
          </div>
        </ScrollArea>

        {/* Activity Feed */}
        {activities.length > 0 && (
          <div className="p-4 border-t border-border/60">
            <ActivityFeed activities={activities} maxItems={5} />
          </div>
        )}

        {/* Current User */}
        {currentUser && (
          <div className="p-4 border-t border-border/60">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow overflow-hidden">
                <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                {currentUser.email && (
                  <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 h-16 px-6 flex items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur-sm">
          <h1 className="text-lg font-semibold">Trip Board</h1>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="h-9">
              <Link href="/trip-details">
                <Calendar className="h-4 w-4 mr-2" />
                Itinerary
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground" 
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Search and Filters Bar */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-border/60 bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            {/* Search and Quick Actions */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search flights, stays, activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="w-[180px] h-9">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-voted">Most Voted</SelectItem>
                  <SelectItem value="most-recent">Most Recent</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Select
                  value={filterOption.contributor || 'all'}
                  onValueChange={(value) => 
                    setFilterOption(prev => ({ ...prev, contributor: value === 'all' ? undefined : value }))
                  }
                >
                  <SelectTrigger className="w-[200px] h-9">
                    <SelectValue placeholder="Filter by contributor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contributors</SelectItem>
                    {members.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9"
                  onClick={() => {
                    setFilterOption({});
                    setSearchQuery('');
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Category Tabs */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow w-fit">
                <TabsList className="h-10 p-1 bg-muted rounded-full">
                  {columns.map(column => (
                    <TabsTrigger
                      key={column.id}
                      value={column.id}
                      className="h-8 rounded-full px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      {column.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {processedIdeas.mostLiked.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-semibold">Most Liked</h2>
                    <Badge variant="secondary" className="text-xs">
                      {processedIdeas.mostLiked.length} {processedIdeas.mostLiked.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {processedIdeas.mostLiked.map((idea, index) => (
                      <TripIdeaCard
                        key={idea.id}
                        idea={idea}
                        index={index}
                        columnId={activeTab}
                        moveCard={() => {}}
                        currentUserId={currentUserId}
                        onVote={handleVote}
                        isInMostLiked={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab !== 'notes' && processedIdeas.others.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-semibold text-muted-foreground">Other Options</h2>
                    <Badge variant="outline" className="text-xs">
                      {processedIdeas.others.length} {processedIdeas.others.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {processedIdeas.others.map((idea, index) => (
                      <TripIdeaCard
                        key={idea.id}
                        idea={idea}
                        index={index}
                        columnId={activeTab}
                        moveCard={() => {}}
                        currentUserId={currentUserId}
                        onVote={handleVote}
                        isInMostLiked={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {processedIdeas.mostLiked.length === 0 && processedIdeas.others.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-1">No items found</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search or filters' : 'Add a new item to get started'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Chat Sidebar */}
      {isChatOpen && (
        <aside className="w-80 flex-shrink-0 bg-card/50 backdrop-blur-lg border-l border-border/60">
          <div className="p-4 h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-10 w-10 text-muted-foreground mb-4"/>
            <h3 className="font-semibold text-foreground">Group Chat</h3>
            <p className="text-sm text-muted-foreground">Chat panel coming soon!</p>
          </div>
        </aside>
      )}

      {/* Invite Member Dialog */}
      <InviteMemberDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        tripName={tripName}
      />
    </div>
  );
}
