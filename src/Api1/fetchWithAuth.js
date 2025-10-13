import { API_BASE_URL } from "../Api1/apiUrl";

let isRefreshing = false;
let refreshPromise = null;
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

async function refreshAccessToken() {
  if (isRefreshing && refreshPromise) {
    console.log("⏳ Waiting for existing refresh...");
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      console.log("🔄 Refreshing access token...");
      const res = await fetch(`${API_BASE_URL}/auth/RefreshToken`, {
        method: "POST",
        credentials: "include",
      });

      console.log("📡 Refresh response status:", res.status);

      if (!res.ok) {
        console.error("❌ Refresh token failed:", res.status);
        const errorText = await res.text();
        console.error("Error details:", errorText);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return null;
      }

      const data = await res.json();
      console.log("📦 Refresh response data:", data);

      const newToken = data.accessToken || data.Access_Token;

      if (newToken) {
        console.log(
          "✅ New token received:",
          newToken.substring(0, 20) + "..."
        );
        localStorage.setItem("accessToken", newToken);
        return newToken;
      } else {
        console.error(
          "❌ No token in response. Response keys:",
          Object.keys(data)
        );
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return null;
      }
    } catch (err) {
      console.error("❌ Error refreshing token:", err);
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("accessToken");

  const isFormData = options.body instanceof FormData;

  const makeRequest = (authToken) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${authToken}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };

    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  let response = await makeRequest(token);

  if (response.status === 401 || response.status === 403) {
    console.log("🔑 Token expired, refreshing...");

    const newToken = await refreshAccessToken();

    if (newToken) {
      console.log("🔄 Retrying request with new token");

      response = await makeRequest(newToken);

      if (response.ok) {
        console.log("✅ Request successful after refresh");
      }
    } else {
      console.error("❌ Failed to refresh token, redirecting to login");
      window.location.href = "/login";
    }
  }

  return response;
}
