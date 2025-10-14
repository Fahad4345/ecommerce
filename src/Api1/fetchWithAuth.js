import { API_BASE_URL } from "../Api1/apiUrl";

let isRefreshing = false;
let refreshPromise = null;
let hasRedirected = false;

async function refreshAccessToken() {
  if (isRefreshing) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/RefreshToken`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        localStorage.removeItem("accessToken");
        return null;
      }

      const data = await res.json();
      const newToken = data.accessToken || data.Access_Token;

      if (newToken) {
        localStorage.setItem("accessToken", newToken);
        return newToken;
      }

      return null;
    } catch {
      localStorage.removeItem("accessToken");
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function fetchWithAuth(url, options = {}) {
  // ✅ Allow public APIs
  if (options.noAuth) {
    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: "include",
    });
  }

  if (hasRedirected) return new Response(null, { status: 401 });

  let token = localStorage.getItem("accessToken");

  if (!token) {
    if (!hasRedirected) {
      hasRedirected = true;
      localStorage.clear();
    }
    return new Response(null, { status: 401 });
  }

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        credentials: "include",
      });
    } else {
      if (!hasRedirected) {
        hasRedirected = true;
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  }

  return response;
}
