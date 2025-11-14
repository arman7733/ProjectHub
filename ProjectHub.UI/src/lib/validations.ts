import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password must be less than 100 characters' }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password must be less than 100 characters' }),
  role: z.enum(['Admin', 'Manager', 'Developer', 'Tester'], {
    required_error: 'Please select a role',
  }),
});

// Project validation schema
export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Project name must be at least 3 characters' })
    .max(200, { message: 'Project name must be less than 200 characters' }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(1000, { message: 'Description must be less than 1000 characters' }),
  managerId: z.string().uuid({ message: 'Invalid manager selection' }),
  deadline: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, { message: 'Deadline must be in the future' }),
});

// Task validation schema
export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(200, { message: 'Title must be less than 200 characters' }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(1000, { message: 'Description must be less than 1000 characters' }),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  assigneeId: z.string().uuid({ message: 'Invalid assignee selection' }),
  projectId: z.string().uuid({ message: 'Invalid project selection' }),
});

// Team member validation schema
export const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  role: z.enum(['Admin', 'Manager', 'Developer', 'Tester'], {
    required_error: 'Please select a role',
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
