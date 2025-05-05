'use client';

import { useSession } from '@/providers/session-provider';
import { Avatar, AvatarFallback} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function UserProfile() {
  const { user, userLoading, logout } = useSession();

  if (userLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

 

  if (!user) {
    return (
      <Button variant="outline" size="sm">
        Iniciar Sesión
      </Button>
    );
  }

  // Get the first letter of the email as avatar fallback
  const emailFirstChar = user.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8 border border-gray-600">
        <AvatarFallback className="bg-gray-700 text-yellow-400">
          {emailFirstChar}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.name}</span>
        <span className="text-xs text-gray-400">
          {user.progress?.currentRank || 'Aprendiz'}
        </span>
      </div>
      <Button variant="ghost" size="icon" onClick={logout} className="ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </Button>
    </div>
  );
}