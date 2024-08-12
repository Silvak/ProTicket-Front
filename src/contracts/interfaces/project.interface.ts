export interface Owner {
  id: string
  name: string
  email: string
  emailValidated: boolean
  role: string[]
  state: string[]
}

export interface ProjectList {
  id: string
  name: string
  priceTicket: number
  totalTickets: number
  state: string[]
  owner: Owner | string
}

// --------------------------- PROPS --------------------------
export interface ProjectTabletProp {
  limit: number
  page: number
  //next: string | null;
  //prev: string | null;
  projects: ProjectList[]
  total: number
}

export interface ProjectProp {
  name: string
  date: {
    start: string
    end: string
  }
  raffleConfig: {
    priceTicket: number
    totalTickets: number
    perTicket: number
    qrPosition: string
    numberPosition: string
  }
  state: string[]
  owner: Owner | string | null
}
