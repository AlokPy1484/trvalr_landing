
'use client';

export function EmojiIcon({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span role="img" aria-label={label} className="text-xs">
      {emoji}
    </span>
  );
}
