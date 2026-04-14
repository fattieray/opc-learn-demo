import { tasks } from "@/lib/mock/tasks";
import { currentUser } from "@/lib/mock/users";
import { industries, expertCourses } from "@/lib/mock/data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";
const USE_MOCK = true; // Set to true to use mock data for demo

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
  // Return mock data for demo
  if (USE_MOCK) {
    return getMockData(path, options);
  }

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

// Mock data handler
function getMockData(path: string, options: FetchOptions = {}) {
  const method = options.method || "GET";

  // Courses
  if (path.startsWith("/courses")) {
    if (path === "/courses" || path.startsWith("/courses?")) {
      // Parse query params
      const url = new URL(path, "http://localhost");
      const type = url.searchParams.get("type");
      const industry = url.searchParams.get("industry");
      
      let filtered = tasks.filter(t => t.type === "micro" || t.type === "system");
      if (type) {
        filtered = filtered.filter(t => t.type === type);
      }
      if (industry && industry !== "all") {
        filtered = filtered.filter(t => t.industry === industry);
      }
      
      // Convert Task[] to CourseResponse[]
      return Promise.resolve(filtered.map(task => ({
        id: task.id,
        title: task.title,
        type: task.type,
        industry: task.industry,
        estimatedMinutes: task.estimatedMinutes,
        description: task.scenario,
        career: task.career ? {
          title: task.career.title,
          salaryRange: task.career.salaryRange,
        } : undefined,
        activeLearners: task.activeLearners,
        recruitingSquads: task.recruitingSquads,
      })));
    }
    // Single course
    const id = path.split("/").pop();
    const task = tasks.find(t => t.id === id);
    if (!task) return Promise.resolve(null);
    
    // Convert Task to CourseDetail
    return Promise.resolve({
      id: task.id,
      title: task.title,
      type: task.type,
      industry: task.industry,
      estimatedMinutes: task.estimatedMinutes,
      description: task.scenario,
      career: task.career ? {
        title: task.career.title,
        salaryRange: task.career.salaryRange,
      } : undefined,
      activeLearners: task.activeLearners,
      recruitingSquads: task.recruitingSquads,
      content: task.syllabus?.modules.flatMap(m => 
        m.items.map(item => ({
          title: item.title,
          duration: item.minutes || 30,
          type: item.type === "learn" ? "lesson" : "practice",
        }))
      ) || [],
      learning_objectives: task.skills || [],
    });
  }

  // Auth - Login
  if (path === "/auth/login" && method === "POST") {
    return Promise.resolve({
      token: "mock-jwt-token-for-demo",
      user: {
        id: currentUser.id,
        phone: "13800138000",
        nickname: currentUser.name,
        avatar_url: "",
        industry_preference: currentUser.industry,
        skill_profile: {
          retail: currentUser.skills.find(s => s.name.includes("文案") || s.name.includes("内容"))?.score || 0,
          tourism: currentUser.skills.find(s => s.name.includes("旅行"))?.score || 0,
          manufacturing: currentUser.skills.find(s => s.name.includes("B2B") || s.name.includes("产品"))?.score || 0,
        },
      }
    });
  }

  // Auth - Register
  if (path === "/auth/register" && method === "POST") {
    return Promise.resolve({
      token: "mock-jwt-token-for-demo",
      user: {
        id: 1,
        phone: "",
        nickname: "新用户",
        avatar_url: "",
        industry_preference: "",
        skill_profile: { retail: 0, tourism: 0, manufacturing: 0 },
      }
    });
  }

  // Users
  if (path === "/users/me") {
    return Promise.resolve({
      id: currentUser.id,
      phone: "13800138000",
      nickname: currentUser.name,
      avatar_url: "",
      industry_preference: currentUser.industry,
      skill_profile: {
        retail: currentUser.skills.find(s => s.name.includes("文案") || s.name.includes("内容"))?.score || 0,
        tourism: currentUser.skills.find(s => s.name.includes("旅行"))?.score || 0,
        manufacturing: currentUser.skills.find(s => s.name.includes("B2B") || s.name.includes("产品"))?.score || 0,
      },
    });
  }

  if (path === "/users/me" && method === "PUT") {
    return Promise.resolve({
      id: currentUser.id,
      phone: "13800138000",
      nickname: currentUser.name,
      avatar_url: "",
      industry_preference: currentUser.industry,
      skill_profile: {
        retail: currentUser.skills.find(s => s.name.includes("文案") || s.name.includes("内容"))?.score || 0,
        tourism: currentUser.skills.find(s => s.name.includes("旅行"))?.score || 0,
        manufacturing: currentUser.skills.find(s => s.name.includes("B2B") || s.name.includes("产品"))?.score || 0,
      },
    });
  }

  // Assessments
  if (path === "/assessments" && method === "POST") {
    return Promise.resolve({
      industry: "retail",
      course_id: "r-micro-01",
      scores: { retail: 15, tourism: 8, manufacturing: 5 },
    });
  }

  // Missions
  if (path.startsWith("/missions")) {
    return Promise.resolve(tasks);
  }

  // Circles
  if (path.startsWith("/circles")) {
    return Promise.resolve([]);
  }

  // Seed
  if (path === "/seed" && method === "POST") {
    return Promise.resolve({ status: "success" });
  }

  return Promise.resolve(null);
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
