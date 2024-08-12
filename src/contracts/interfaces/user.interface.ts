//todo: unify UserLogin and User interface
export interface UserLogin {
  id: string
  email: string
  fullName: string
  isActive: boolean
  roles: string[]
}

export interface User {
  id: string
  name: string
  email: string
  emailValidated: string
  state: string[]
  role: string[]
}

export interface UserResponse {
  page: number
  limit: number
  total: number
  next: string
  prev: string
  users: User[]
}
