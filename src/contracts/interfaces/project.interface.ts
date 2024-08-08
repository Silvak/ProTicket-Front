export interface Owner {
  id: string
  name: string
  email: string
  emailValidated: boolean
  role: string[]
  state: string[]
}

export interface Project {
  id: string
  name: string
  priceTicket: number
  totalTickets: number
  state: string[]
  owner: Owner | string
}

export interface ProjectTabletProp {
  limit: number
  page: number
  //next: string | null;
  //prev: string | null;
  projects: Project[]
  total: number
}
