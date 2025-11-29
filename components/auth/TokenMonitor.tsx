'use client';

import { useTokenMonitor } from '../../hooks/useTokenMonitor';

/**
 * Component that monitors token validity and handles automatic logout
 * Should be included in layouts that require authentication
 */
export default function TokenMonitor() {
  useTokenMonitor();
  return null; // This component doesn't render anything
}

