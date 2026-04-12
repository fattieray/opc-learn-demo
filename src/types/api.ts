export interface UserResponse {
  id: number;
  phone: string | null;
  nickname: string;
  avatar_url: string;
  industry_preference: string;
  skill_profile: Record<string, number>;
}

export interface CourseResponse {
  id: string;
  title: string;
  type: "micro" | "system" | "expert";
  industry: string;
  estimatedMinutes: number;
  description: string;
  career?: { title: string; salaryRange: string };
  activeLearners: number;
  recruitingSquads: number;
}

export interface CourseDetail extends CourseResponse {
  content: Array<{ title: string; duration: number; type: string }>;
  learning_objectives: string[];
}

export interface AssessmentResponse {
  industry: string;
  course_id: string;
  scores: Record<string, number>;
  reason: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface RegisterResponse {
  token: string;
  user: UserResponse;
}
