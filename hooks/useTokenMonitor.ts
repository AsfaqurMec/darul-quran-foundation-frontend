'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  startTokenMonitoring, 
  stopTokenMonitoring, 
  getClientToken,
  removeClientToken 
} from '../lib/tokenUtils';

/**
 * Hook to monitor token validity and automatically logout when token expires
 * Checks token every 10 seconds and logs out if invalid
 * Also sets up automatic logout after 2 hours
 */
export const useTokenMonitor = () => {
  const router = useRouter();

  useEffect(() => {
    // Only start monitoring if there's a token
    const token = getClientToken();
    if (!token) {
      return;
    }

    const handleLogout = async () => {
      try {
        // Call logout API if available
        await fetch('/api/logout', { method: 'POST' });
      } catch (error) {
        console.error('Logout request failed', error);
      } finally {
        // Remove token (this will dispatch auth-change event)
        removeClientToken();
        
        // Dispatch additional auth-change event to ensure all components are notified
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-change'));
        }
        
        router.push('/login');
        router.refresh();
      }
    };

    // Start monitoring
    startTokenMonitoring(handleLogout);

    // Cleanup on unmount
    return () => {
      stopTokenMonitoring();
    };
  }, [router]);
};

