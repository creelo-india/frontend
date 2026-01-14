/**
 * Utility functions for Next.js fetch caching
 * Use these for server-side data fetching with caching strategies
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions {
  revalidate?: number; // Time in seconds to revalidate
  tags?: string[]; // Cache tags for on-demand revalidation
  cache?: RequestCache; // Cache strategy
}

/**
 * Fetch with Next.js caching and revalidation
 * @param endpoint - API endpoint (without base URL)
 * @param options - Fetch options including revalidate
 */
export async function fetchWithCache(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { revalidate = 3600, tags, cache = "force-cache" } = options;

  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate,
      ...(tags && { tags }),
    },
    cache,
  };

  return fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
}

/**
 * Fetch products with 1 hour revalidation
 */
export async function fetchProducts() {
  return fetchWithCache("/api/products", {
    revalidate: 3600, // 1 hour
    tags: ["products"],
  });
}

/**
 * Fetch user profile (no cache for user-specific data)
 */
export async function fetchProfile(token: string) {
  return fetch(`${API_BASE_URL}/api/auth/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}
