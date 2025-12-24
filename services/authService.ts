import { apiClient } from "./apiClient";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  user: User;
}

export const authService = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>("/auth/register", data);
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/login", data);
  },

  async me(): Promise<User> {
    return apiClient.get<User>("/auth/me");
  },

  async logout(): Promise<void> {
    return apiClient.post("/auth/logout");
  },

};
