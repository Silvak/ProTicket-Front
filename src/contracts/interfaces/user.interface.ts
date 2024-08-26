export interface User {
  id?: string
  name?: string
  email?: string
  emailValidated?: string
  state?: string[]
  role?: string[]
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

// --------------------------- PROPS --------------------------
export interface UserProp {
  id: string
  name: string
  email: string
  emailValidated: string
  role: string[]
  state: string[]
}

export type UserTabletProp = {
  limit: number
  page: number
  users: UserProp[]
  total: number
}
