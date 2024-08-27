export interface ProjectList {
  id: string
  name: string
  priceTicket: number
  totalTickets: number
  state: string[]
  owner: Owner | string
}

export interface ProjectResponse {
  page: number
  limit: number
  total: number
  next: string
  prev: string
  projects: ProjectList[]
}

// --------------------------- PROPS --------------------------
export interface Owner {
  id: string
  name: string
  email: string
  emailValidated: boolean
  role: string[]
  state: string[]
}

export interface ProjectProp {
  id: string
  name: string
  date: {
    start: string
    end: string
  }
  owner: {
    id: string | null
  }
  raffleConfig: {
    img: string
    priceTicket: number
    totalTickets: number
    perTicket: number
    qrPosition: string
    numberPosition: string
  }
  state: string[]
}

export interface ProjectTabletProp {
  limit: number
  page: number
  //next: string | null;
  //prev: string | null;
  projects: ProjectList[]
  total: number
}
