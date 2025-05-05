"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Keycloak from "keycloak-js";
import { AuthLoading } from "@/components/auth/auth-loading";

declare global {
  interface Window {
    _keycloak: any;
  }
}

type SessionContextType = {
  keycloak: Keycloak | null;
  initialized: boolean;
  authenticated: boolean;
  token: string | undefined;
  login: () => void;
  logout: () => void;
  user: any | null; // Add user data to context
  userLoading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  keycloak: null,
  initialized: false,
  authenticated: false,
  token: undefined,
  login: () => {},
  logout: () => {},
  user: null, // Add user data to context
  userLoading: true,
});

export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Function to register user from Keycloak data
  const registerUser = async (keycloakInstance: Keycloak) => {
    if (!keycloakInstance.authenticated || !keycloakInstance.tokenParsed) {
      setUser(null);
      setUserLoading(false);
      return;
    }

    try {
      const tokenData = keycloakInstance.tokenParsed as any;
      const userEmail = tokenData.email;
      
      // Check if we have the user in session storage first to avoid unnecessary API calls
      const storedUserStr = sessionStorage.getItem('rpg_user');
      if (storedUserStr) {
        try {
          const storedUser = JSON.parse(storedUserStr);
          // Only use stored user if it matches the current email
          if (storedUser && storedUser.id === userEmail) {
            setUser(storedUser);
            setUserLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing stored user:', e);
          // Continue to API call if there's an error with stored data
        }
      }

      // If no stored user found, call API to register/retrieve
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: tokenData.name || tokenData.preferred_username,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Store user data in session storage to avoid future API calls
        sessionStorage.setItem('rpg_user', JSON.stringify(userData));
        setUser(userData);
      } else {
        console.error('Failed to register user:', await response.text());
        setUser(null);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;
    
    const initKeycloak = async () => {
      const kc = new Keycloak({
        url: process.env.NEXT_PUBLIC_KEYCLOAK_URL ?? '',
        realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
      });

      try {
        const authenticated = await kc.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
          checkLoginIframe: false,
        });

        setKeycloak(kc);
        setInitialized(true);
        window._keycloak = kc;

        if (authenticated && kc.token) {
          localStorage.setItem('kc_token', kc.token);
          
          // Register user in our database
          await registerUser(kc);
          
          refreshInterval = setInterval(async () => {
            console.group('🔄 Token Refresh Attempt');
            try {
              const refreshed = await kc.updateToken(70);
       
              if (refreshed && kc.token) {
                localStorage.setItem('kc_token', kc.token);
              }
            } catch (error) {
              console.error('Failed to refresh token:', error);
              clearInterval(refreshInterval);
              localStorage.removeItem('kc_token');
              sessionStorage.removeItem('rpg_user'); // Clear stored user on token refresh failure
              setUser(null);
              kc.logout({
                redirectUri: window.location.origin,
              });
            }
            console.groupEnd();
          }, 60000);
        } else if (pathname.startsWith('/dashboard')) {
          console.log('User not authenticated, redirecting to login');
          setUserLoading(false);
          await kc.login({
            redirectUri: window.location.origin + pathname,
          });
        } else {
          setUserLoading(false);
        }
      } catch (error) {
        console.error('Keycloak initialization error:', error);
        setInitialized(true);
        setUserLoading(false);
      }
      console.groupEnd();
    };

    initKeycloak();

    return () => {
      console.log('Cleaning up Keycloak session');
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
      localStorage.removeItem('kc_token');
      sessionStorage.removeItem('rpg_user'); // Clear on unmount as well
    };
  }, [pathname]);

  const login = () => {
    if (keycloak) {
      keycloak.login({
        redirectUri: window.location.origin + "/dashboard",
      });
    }
    console.groupEnd();
  };

  const logout = () => {
    if (keycloak) {
      localStorage.removeItem('kc_token');
      sessionStorage.removeItem('rpg_user'); // Clear stored user on logout
      setUser(null);
      keycloak.logout({
        redirectUri: window.location.origin,
      });
    }
    console.groupEnd();
  };

  if (!initialized) {
    return <AuthLoading />;
  }

  if (pathname.startsWith('/dashboard') && !keycloak?.authenticated) {
    return <AuthLoading />;
  }

  return (
    <SessionContext.Provider
      value={{
        keycloak,
        initialized,
        authenticated: !!keycloak?.authenticated,
        token: keycloak?.token,
        login,
        logout,
        user,
        userLoading
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}