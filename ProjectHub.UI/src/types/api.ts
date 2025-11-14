// API Response types for .NET Core backend integration

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Developer' | 'Tester';
  createdAt: string;
  updatedAt: string;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  manager?: User;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  progress: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  project?: Project;
  assigneeId: string;
  assignee?: User;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Dashboard stats
export interface DashboardStats {
  totalProjects: number;
  activeTasks: number;
  teamMembers: number;
  pendingReviews: number;
}
