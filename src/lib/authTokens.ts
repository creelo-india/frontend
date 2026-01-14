/**
 * Authentication token management utilities
 * Handles access tokens in HttpOnly cookies for security
 */

const ACCESS_TOKEN_KEY = "accessToken";

/**
 * Set access token in cookie (client-side)
 * Note: For HttpOnly cookies, use server-side cookie setting in API routes
 */
export function setAccessToken(token: string, days: number = 7): void {
  if (typeof window === "undefined") {
    console.warn("setAccessToken: Cannot set cookie on server. Use API route instead.");
    return;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${ACCESS_TOKEN_KEY}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

/**
 * Get access token from cookie (client-side)
 * Note: HttpOnly cookies cannot be accessed via JavaScript
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const name = ACCESS_TOKEN_KEY + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

/**
 * Remove access token from cookie (client-side)
 */
export function removeAccessToken(): void {
  if (typeof window === "undefined") {
    console.warn("removeAccessToken: Cannot remove cookie on server. Use API route instead.");
    return;
  }

  document.cookie = `${ACCESS_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Server-side: Set access token in HttpOnly cookie
 * Use this in API routes or Server Actions
 */
export async function setAccessTokenServer(
  token: string,
  days: number = 7
): Promise<void> {
  if (typeof window !== "undefined") {
    console.warn("setAccessTokenServer: Use setAccessToken for client-side.");
    return;
  }

  const { cookies } = await import("next/headers");
  const cookieStore = cookies();

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  cookieStore.set(ACCESS_TOKEN_KEY, token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

/**
 * Server-side: Get access token from HttpOnly cookie
 * Use this in Server Components or API routes
 */
export async function getAccessTokenServer(): Promise<string | null> {
  if (typeof window !== "undefined") {
    console.warn("getAccessTokenServer: Use getAccessToken for client-side.");
    return null;
  }

  const { cookies } = await import("next/headers");
  const cookieStore = cookies();
  const token = cookieStore.get(ACCESS_TOKEN_KEY);

  return token?.value || null;
}

/**
 * Server-side: Remove access token from HttpOnly cookie
 * Use this in API routes or Server Actions
 */
export async function removeAccessTokenServer(): Promise<void> {
  if (typeof window !== "undefined") {
    console.warn("removeAccessTokenServer: Use removeAccessToken for client-side.");
    return;
  }

  const { cookies } = await import("next/headers");
  const cookieStore = cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
}
