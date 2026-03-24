// redux/services/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { logout, setCredentials } from '../features/authSlice';

// Helper to get a cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

// Helper to set a cookie
const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

// Helper to clear cookies
const clearAuthCookies = () => {
  if (typeof document === 'undefined') return;
  const cookiesToClear = ["accessToken", "refreshToken", "userRole", "userEmail", "userPermissions", "reset_verified"];
  cookiesToClear.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

interface RefreshTokenResponse {
  message: string;
  access_token: string;
  expires_in: number;
  expires_at: number;
}

// ─── Base Query ───────────────────────────────────────────────────────────────

const baseQuery = fetchBaseQuery({
  // The API base URL – endpoints already include /api/...
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token ?? getCookie("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // Don't override Content-Type for FormData (browser sets it with boundary)
    if (!headers.get("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

// ─── Auto-Refresh Wrapper ─────────────────────────────────────────────────────

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = getCookie("refreshToken"); 

    if (!refreshToken) {
      api.dispatch(logout());
      clearAuthCookies();
      return result;
    }

    // Attempt silent token refresh
    // POST /api/auth/refresh  body: { refresh_token }
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Response shape: { message, access_token, expires_in, expires_at }
      const responseData = refreshResult.data as RefreshTokenResponse;
      const newAccessToken = responseData.access_token;

      if (newAccessToken) {
        // Here we restore user from current state but inject new token
        // But since authSlice does not store `refreshToken` natively or have updateTokens action, we can't just dispatch updateTokens easily.
        // Wait, the user specifically wrote `updateTokens` in their prompt:
        // api.dispatch(updateTokens({ token: newAccessToken, tokenExpiresAt: responseData.expires_at }))
        // I will add `updateTokens` to authSlice.
        api.dispatch({
            type: 'auth/updateTokens',
            payload: { token: newAccessToken, tokenExpiresAt: responseData.expires_at }
        });

        // const rememberMe = getCookie("rememberMe") === "true";
        setCookie("accessToken", newAccessToken);

        // Retry the original request with the refreshed token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // api.dispatch(logout());
        // clearAuthCookies();
        console.log("Token refresh failed");
      }
    } else {
      // api.dispatch(logout());
      // clearAuthCookies();
      console.log("Token refresh failed");
    }
  }

  return result;
};


// Create the base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  // Define tag types for cache invalidation
  tagTypes: ['User', 'Auth', 'Dashboard', 'Job', 'Application'],
  // Define endpoints in separate files and inject them here
  endpoints: () => ({}),
});

export const {} = apiSlice;
