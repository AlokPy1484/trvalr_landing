
import { MyChatsPageClient } from '@/components/my-chats/MyChatsPageClient';

export default function MyChatsPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#4d3c2d] via-[#3a2f26] to-[#2a231f] text-yellow-50/90">
      {/* Header is rendered within MyChatsPageClient for consistent scroll state management */}
      <MyChatsPageClient />
    </div>
  );
}
