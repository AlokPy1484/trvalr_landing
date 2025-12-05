
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, UserPlus, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InviteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripName: string;
}

export function InviteMemberDialog({ isOpen, onClose, tripName }: InviteMemberDialogProps) {
  const [email, setEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('https://trvalr.com/invite/trip-123');
  const [copied, setCopied] = useState(false);

  const handleInviteByEmail = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }
    
    // TODO: Send invite email
    toast({
      title: 'Invitation sent',
      description: `Invitation sent to ${email}`,
    });
    
    setEmail('');
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({
      title: 'Link copied',
      description: 'Invite link copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Member to {tripName}
          </DialogTitle>
          <DialogDescription>
            Invite team members to collaborate on this trip. They'll be able to vote, add options, and share ideas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Email Invite */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  onKeyPress={(e) => e.key === 'Enter' && handleInviteByEmail()}
                />
              </div>
              <Button onClick={handleInviteByEmail} disabled={!email}>
                Send
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Share Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Share Invite Link</Label>
            <div className="flex gap-2">
              <Input
                id="link"
                value={inviteLink}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can join the trip board
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

