// Client-side token utilities
import { jwtDecode } from "jwt-decode";

const TOKEN_COOKIE = "accessToken";
// Token expiration time: 2 hours (7200 seconds)
export const TOKEN_EXPIRY_SECONDS = 7200;
// Token validation check interval: 5 seconds
export const TOKEN_CHECK_INTERVAL = 5000;

const isBrowser = () => typeof window !== "undefined";

const getCookie = (name: string): string | null => {
  if (!isBrowser()) return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    const [cookieName, ...rest] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
};

const setCookie = (
  name: string,
  value: string,
  {
    maxAgeSeconds,
  }: {
    maxAgeSeconds: number;
  },
) => {
  if (!isBrowser()) return;

  const expires = new Date(Date.now() + maxAgeSeconds * 1000).toUTCString();
  const shouldUseSecure =
    window.location.protocol === "https:" ||
    process.env.NODE_ENV === "production";

  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    `Expires=${expires}`,
    "SameSite=Strict",
  ];

  if (shouldUseSecure) {
    parts.push("Secure");
  }

  document.cookie = parts.join("; ");
};

const removeCookie = (name: string) => {
  if (!isBrowser()) return;
  document.cookie = `${name}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
};

export const getClientToken = () => {
  return getCookie(TOKEN_COOKIE);
};

export const setClientToken = (
  token: string,
  fallbackMaxAgeSeconds = TOKEN_EXPIRY_SECONDS,
) => {
  if (!isBrowser()) return;

  let maxAgeSeconds = fallbackMaxAgeSeconds;

  try {
    const decoded: { exp?: number } = jwtDecode(token);
    if (decoded?.exp) {
      const remaining = decoded.exp * 1000 - Date.now();
      if (remaining > 0) {
        maxAgeSeconds = Math.floor(remaining / 1000);
      }
    }
  } catch {
    // Ignore decode errors and fallback to provided max age
  }

  setCookie(TOKEN_COOKIE, token, { maxAgeSeconds });
};

export const removeClientToken = () => {
  if (!isBrowser()) return;
  removeCookie(TOKEN_COOKIE);

  try {
    window.dispatchEvent(new CustomEvent("auth-change"));
  } catch {
    // ignore event dispatch errors
  }
};

/**
 * Validate token value format (JWT structure)
 * @param token - Token string to validate
 * @returns true if token has valid JWT format, false otherwise
 */
const isValidTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== "string") {
    return false;
  }

  // Check if token is not empty
  if (token.trim().length === 0) {
    return false;
  }

  // JWT should have 3 parts separated by dots: header.payload.signature
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  // Each part should not be empty
  if (parts.some(part => part.length === 0)) {
    return false;
  }

  return true;
};

/**
 * Check if the current token is valid (value and expiration)
 * @returns true if token is valid, false otherwise
 */
export const isClientTokenValid = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const token = getClientToken();
  
  // Check if token exists and is not null/undefined
  if (!token) {
    return false;
  }

  // Validate token format
  if (!isValidTokenFormat(token)) {
    console.warn("Token has invalid format");
    return false;
  }

  try {
    // Decode JWT to check expiration and structure
    const decoded: { exp?: number; [key: string]: any } = jwtDecode(token);
    
    // Verify decoded token has valid structure
    if (!decoded || typeof decoded !== "object") {
      console.warn("Token decoded to invalid structure");
      return false;
    }

    // Check if token has expiration claim
    if (decoded.exp) {
      // exp is in seconds, convert to milliseconds for comparison
      const expirationTime = decoded.exp * 1000;
      const isValid = expirationTime > Date.now();
      
      if (!isValid) {
        console.log("Token has expired (JWT exp claim)");
      }
      
      return isValid;
    }

    // If no expiration info, assume invalid
    console.warn("Token has no expiration information");
    return false;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

/**
 * Get the remaining time until token expires (in milliseconds)
 * @returns remaining time in milliseconds, or 0 if expired/invalid
 */
export const getTokenRemainingTime = (): number => {
  if (typeof window === "undefined") {
    return 0;
  }

  const token = getClientToken();
  
  // Check if token exists
  if (!token) {
    return 0;
  }

  // Validate token format
  if (!isValidTokenFormat(token)) {
    return 0;
  }

  try {
    const decoded: { exp?: number; [key: string]: any } = jwtDecode(token);
    
    // Verify decoded token has valid structure
    if (!decoded || typeof decoded !== "object") {
      return 0;
    }
    
    if (decoded.exp) {
      const expirationTime = decoded.exp * 1000;
      const remaining = expirationTime - Date.now();
      return remaining > 0 ? remaining : 0;
    }

    return 0;
  } catch (error) {
    console.error("Error getting token remaining time:", error);
    return 0;
  }
};

// Global variable to store the token monitoring interval
let tokenMonitorInterval: NodeJS.Timeout | null = null;
let tokenExpiryTimeout: NodeJS.Timeout | null = null;

/**
 * Start monitoring token validity
 * Checks token every 10 seconds and logs out if invalid
 * Also sets up automatic logout after 2 hours
 * @param onLogout - Callback function to execute on logout
 */
export const startTokenMonitoring = (onLogout: () => void) => {
  if (typeof window === "undefined") {
    return;
  }

  // Clear any existing monitoring
  stopTokenMonitoring();

  // Check token validity every 10 seconds
  tokenMonitorInterval = setInterval(() => {
    if (!isClientTokenValid()) {
      console.log("Token is invalid, logging out...");
      stopTokenMonitoring();
      removeClientToken();
      onLogout();
    }
  }, TOKEN_CHECK_INTERVAL);

  // Set up automatic logout after 2 hours
  const remainingTime = getTokenRemainingTime();
  if (remainingTime > 0) {
    tokenExpiryTimeout = setTimeout(() => {
      console.log("Token expired after 2 hours, logging out...");
      stopTokenMonitoring();
      removeClientToken();
      onLogout();
    }, remainingTime);
  } else {
    // Token already expired, logout immediately
    console.log("Token already expired, logging out...");
    stopTokenMonitoring();
    removeClientToken();
    onLogout();
  }
};

/**
 * Stop monitoring token validity
 */
export const stopTokenMonitoring = () => {
  if (tokenMonitorInterval) {
    clearInterval(tokenMonitorInterval);
    tokenMonitorInterval = null;
  }
  if (tokenExpiryTimeout) {
    clearTimeout(tokenExpiryTimeout);
    tokenExpiryTimeout = null;
  }
};
