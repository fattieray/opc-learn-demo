const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

// Authentication utilities
export const authUtils = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
  isAuthenticated: () => {
    return !!authUtils.getToken();
  },
};

async function fetchAPI(path: string, options: FetchOptions = {}) {
  const { requiresAuth = false, ...restOptions } = options;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, { ...restOptions, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "API error" }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Auth
  auth: {
    register: (phone: string, nickname: string) =>
      fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify({ phone, nickname }),
      }),
    login: (phone: string, otp: string) =>
      fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
      }),
  },

  // Courses
  courses: {
    list: (params?: { type?: string; industry?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.type) queryParams.set("type", params.type);
      if (params?.industry) queryParams.set("industry", params.industry);
      const queryString = queryParams.toString();
      return fetchAPI(queryString ? `/courses?${queryString}` : `/courses`);
    },
    get: (id: string) => fetchAPI(`/courses/${id}`),
  },

  // Assessments
  assessments: {
    submit: (answers: Record<number, string>) =>
      fetchAPI("/assessments", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify({ answers }),
      }),
  },

  // Users
  users: {
    me: () => fetchAPI("/users/me", { requiresAuth: true }),
    update: (data: { nickname?: string; industry_preference?: string }) =>
      fetchAPI("/users/me", {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),
  },

  // Seed (for development)
  seed: () =>
    fetchAPI("/seed", {
      method: "POST",
    }),
};
