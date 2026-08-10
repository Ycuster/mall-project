export type UserRole = 'user' | 'admin'

export interface User {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  role: UserRole
  status: number
  created_at: string
  roles?: { id: number; code: string; name: string }[]
  permissions?: {
    codes: string[]
    modules: string[]
    types: Record<string, string[]>
  }
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  password: string
  nickname?: string
}

export interface AuthResponse {
  token: string
  user: User
  permissions?: {
    codes: string[]
    modules: string[]
    types: Record<string, string[]>
  }
}

export interface Role {
  id: number
  name: string
  code: string
  description: string
  sort_order: number
  status: number
  created_at: string
  updated_at: string
  permissions?: { id: number; code: string }[]
}