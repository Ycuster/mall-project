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