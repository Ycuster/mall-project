export type UserRole = 'user' | 'admin'

export interface Permission {
  id: number
  name: string
  resource: string
  action: string
}

export interface Role {
  id: number
  name: string
  display_name: string
  description: string
  permissions: Permission[]
  created_at?: string
}

export interface User {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  role: UserRole
  role_id: number
  permissions: Permission[]
  status: number
  created_at: string
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
}