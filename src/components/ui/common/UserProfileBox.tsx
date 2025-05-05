'use client';

import { MedievalSharp } from 'next/font/google';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSubmissionContext } from '@/contexts/SubmissionContext';
import { Bell } from 'lucide-react';
import { useSSE } from '@/hooks/useSSE';
import { useSession } from 'next-auth/react';
import federatedLogout from "@/utils/federatedLogout";

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export function UserProfileBox({ isMobile }: { isMobile?: boolean }) {
  const { data:sessionData } = useSession();
  const { state: { notifications, unreadCount }, markAsRead } = useSubmissionContext();
  const [isVisible, setIsVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevNotificationCount = useRef(notifications.length);
  
  // Memoize user data to prevent unnecessary re-renders
  const user = useMemo(() => sessionData?.user, [sessionData]);
  const userEmail = useMemo(() => user?.email || null, [user]);
  
  // Initialize SSE connection - hooks must be called at the top level
  useSSE(userEmail);
  
  // Show the component after a short delay for a nice entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5; // Set volume to 50%
  }, []);

  // Play sound when new notifications arrive
  useEffect(() => {
    if (notifications.length > prevNotificationCount.current) {
      audioRef.current?.play().catch(err => console.log('Error playing sound:', err));
    }
    prevNotificationCount.current = notifications.length;
  }, [notifications.length]);

  // Memoize event handlers to prevent unnecessary re-renders
  const logout = useCallback(() => {
    federatedLogout();
  }, []);

  const toggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
    if (!showNotifications) {
      markAsRead();
    }
  }, [showNotifications, markAsRead]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowNotifications(false);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(prev => !prev);
    setShowNotifications(false);
  }, []);
  

  if (isMobile) {
    return (
      <>
        {showNotifications && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleOverlayClick}
          />
        )}
        <div className="relative flex items-center gap-2">
          {/* Mobile Avatar Button */}
          <button 
            onClick={toggleMobileMenu}
            className="relative"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A356] to-[#8B6E3A] p-0.5">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-[#C9A356] font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
            </div>
          </button>

          {/* Mobile Notifications Button */}
          <button 
            onClick={toggleNotifications}
            className="relative p-1.5 rounded-full bg-gray-800/50 border border-[#C9A356]/30"
          >
            <Bell className="w-4 h-4 text-[#C9A356]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="fixed top-[60px] right-4 w-64 bg-gray-900/95 border border-[#C9A356]/50 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-[#C9A356]/30">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className={`${medievalSharp.className} text-sm text-[#C9A356]`}>
                      {user?.name || 'Usuario'}
                    </span>
                {/*     <span className="text-xs text-gray-400">
                      {user?.progress?.currentRank || 'Aprendiz'}
                    </span> */}
                  </div>
                  {/* XP Display */}
                  <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                    <div className="w-6 h-6 rounded-full bg-[#C9A356]/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#C9A356]">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#C9A356]">XP Total</span>
                      <span className={`${medievalSharp.className} text-sm text-white`}>1,234 XP</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full p-3 text-left text-[#C9A356] hover:bg-gray-800/50 flex items-center gap-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}

          {/* Mobile Notifications Dropdown */}
          {showNotifications && (
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-gray-900/95 border border-[#C9A356]/50 rounded-lg shadow-lg overflow-hidden z-50"
              style={{ 
                backgroundImage: "url('/images/obj/paper-texture.png')", 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="p-3 border-b border-[#C9A356]/30">
                <h3 className={`${medievalSharp.className} text-sm text-[#C9A356]`}>Notificaciones</h3>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    No hay notificaciones
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b border-[#C9A356]/20 ${
                        notification.type === 'approved' ? 'bg-green-900/20' : 
                        notification.type === 'rejected' ? 'bg-red-900/20' : 
                        'bg-blue-900/20'
                      }`}
                    >
                      <p className="text-sm text-white">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // Desktop version
  return (
    <>
      {showNotifications && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleOverlayClick}
        />
      )}
      <div 
        className={`fixed top-8 right-[7%] z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[10%] opacity-0'
        }`}
      >
        {/* Original desktop layout... */}
        <div className="relative bg-gray-900/80 backdrop-blur-sm border border-[#C9A356]/50 rounded-lg p-4 shadow-lg"
             style={{ backgroundImage: "url('/images/obj/paper-texture.png')", backgroundSize: 'cover', backgroundPosition: 'center' ,backgroundBlendMode: 'overlay',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          {/* Existing desktop code... */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A356]"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A356]"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A356]"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A356]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A356]/5 to-transparent animate-pulse"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A356] to-[#8B6E3A] p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-[#C9A356] font-bold">
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </div>
              </div>
              <div className="absolute -inset-1 rounded-full border border-[#C9A356]/30 animate-pulse"></div>
            </div>
            
            <div className="flex flex-col">
              <span className={`${medievalSharp.className} text-sm text-[#C9A356]`}>
                {user?.name || 'Usuario'}
              </span>
           {/*    <span className="text-xs text-gray-400">
                {user?.progress?.currentRank || 'Aprendiz'}
              </span> */}
            </div>
            
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="ml-2 p-1.5 rounded-full bg-gray-800/50 border border-[#C9A356]/30 hover:bg-gray-700/50 transition-colors group"
              >
                <Bell className="w-4 h-4 text-[#C9A356] group-hover:text-[#E5B86B] transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-gray-900/95 border border-[#C9A356]/50 rounded-lg shadow-lg overflow-hidden z-50"
                  style={{ 
                    backgroundImage: "url('/images/obj/paper-texture.png')", 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="p-3 border-b border-[#C9A356]/30">
                    <h3 className={`${medievalSharp.className} text-sm text-[#C9A356]`}>Notificaciones</h3>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-400 text-sm">
                        No hay notificaciones
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-[#C9A356]/20 ${
                            notification.type === 'approved' ? 'bg-green-900/20' : 
                            notification.type === 'rejected' ? 'bg-red-900/20' : 
                            'bg-blue-900/20'
                          }`}
                        >
                          <p className="text-sm text-white">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={logout}
              className="ml-2 p-1.5 rounded-full bg-gray-800/50 border border-[#C9A356]/30 hover:bg-gray-700/50 transition-colors group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-[#C9A356] group-hover:text-[#E5B86B] transition-colors"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent"></div>
        </div>
      </div>
    </>
  );
} 