import { refreshAccessToken } from "./auth";

const API_BASE_URL = "http://localhost:5000";

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  retry = true
): Promise<any> => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (res.ok) {
    return res.json();
  }

  const data = await res.json();

  if (
    res.status === 401 &&
    retry &&
    data.message?.toLowerCase().includes("expired")
  ) {
    try {
      const newAccessToken = await refreshAccessToken();

      return apiRequest(
        endpoint,
        {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${newAccessToken}`,
          },
        },
        false 
      );
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw err;
    }
  }

  throw new Error(data.message || "Something went wrong");
};
