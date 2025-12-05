
'use client';

import { OrbitConnectCard, type ConnectProfile } from './OrbitConnectCard';

// Combining and extending existing traveler data for more variety
const connectProfiles: ConnectProfile[] = [
    { id: 't1', name: 'Amelie Duval', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman happy', location: 'Paris, France', flagCode: 'FR', tagline: 'Lover of art, croissants, and rainy days.' },
    { id: 't2', name: 'David Yang', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man thoughtful', location: 'Shanghai, China', flagCode: 'CN', tagline: 'Tech enthusiast exploring ancient traditions.' },
    { id: 'in1', name: 'Aarav Sharma', avatarUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man smiling', location: 'Mumbai, India', flagCode: 'IN', tagline: 'Street food connoisseur and Bollywood buff.' },
    { id: 't4', name: 'Lisa Weber', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman professional', location: 'Berlin, Germany', flagCode: 'DE', tagline: 'Into techno, history, and sustainable travel.' },
    { id: 'jack', name: 'Jack Ryan', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man portrait', location: 'Venice, Italy', flagCode: 'IT', tagline: 'Sailing the canals of my beautiful city.' },
    { id: 'in2', name: 'Diya Patel', avatarUrl: 'https://images.unsplash.com/photo-1619472322303-933e0a4e72a8?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman portrait', location: 'Gujarat, India', flagCode: 'IN', tagline: 'Fascinated by textiles and vibrant festivals.' },
    { id: 't6', name: 'Hannah Lee', avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman glasses', location: 'Kyoto, Japan', flagCode: 'JP', tagline: 'Finding zen in every temple and garden.' },
    { id: 't10', name: 'Isabella Rossi', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman italy', location: 'Rome, Italy', flagCode: 'IT', tagline: 'Living la dolce vita, one pasta at a time.' },
    { id: 'liam', name: 'Liam Miller', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man outdoor', location: 'Reykjavik, Iceland', flagCode: 'IS', tagline: 'Chasing waterfalls and the northern lights.' },
    { id: 't8', name: 'Emma Scott', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman travel', location: 'London, UK', flagCode: 'GB', tagline: 'Exploring pubs, parks, and palaces.' },
    { id: 'in3', name: 'Rohan Gupta', avatarUrl: 'https://images.unsplash.com/photo-1618567523799-556de6522c02?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man outdoor', location: 'Goa, India', flagCode: 'IN', tagline: 'Beach life and bike rides are my therapy.' },
    { id: 'emily', name: 'Emily Smith', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman smiling', location: 'Kyoto, Japan', flagCode: 'JP', tagline: 'Capturing moments, one photo at a time.' }
];


export function OrbitConnectView() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {connectProfiles.map(profile => (
                <OrbitConnectCard key={profile.id} profile={profile} />
            ))}
        </div>
    );
}
