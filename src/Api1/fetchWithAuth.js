import { API_BASE_URL } from "../Api1/apiUrl";

async function refreshAccessToken() {
  try {
    console.log("Refresh access token called");
    const res = await fetch(`${API_BASE_URL}/auth/RefreshToken`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Refresh token failed:", res.status);
      return null;
    }

    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }
    return null;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
}

export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("accessToken");
  console.log("Token", token);

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
    console.log("Access token expired, trying refresh...");

    const newToken = await refreshAccessToken();

    if (newToken) {
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      };

      response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
      });
    }
    console.log("New Token from refresh:", newToken);
  }

  return response;
}
