export interface User {
  id: string
  name: string
  email: string
  emailValidated: string
  state: string[]
  roles: string[]
  token?: string
}

export interface UserResponse {
  page: number
  limit: number
  total: number
  next: string
  prev: string
  users: User[]
}
