// Client-side token utilities
export const getClientToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setClientToken = (token: string, maxAgeSeconds = 60 * 60) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    try {
      sessionStorage.setItem("token", token);
    } catch {
      // ignore session storage errors
    }
    try {
      const expires = new Date(Date.now() + maxAgeSeconds * 1000).toUTCString();
      document.cookie = `accessToken=${token}; Path=/; Max-Age=${maxAgeSeconds}; Expires=${expires}; SameSite=Lax`;
    } catch {
      // ignore cookie errors
    }
  }
};

export const removeClientToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    try {
      sessionStorage.removeItem("token");
    } catch {
      // ignore session storage errors
    }
    try {
      document.cookie =
        "accessToken=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    } catch {
      // ignore cookie errors
    }
  }
};
