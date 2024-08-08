import { tesloApi } from '@/api/teslo'
import { useAuthStore } from '@/store'

export interface Owner {
  name: string
  email: string
  emailValidated: boolean
  role: string[]
  state: string[]
  id: string
}

interface Project {
  id: string
  name: string
  totalTickets: number
  state: string[]
  owner: Owner
}

export interface ProjectResponse {
  page: number
  limit: number
  total: number
  next: string
  prev: string
  projects: Project[]
}

export const getProjects = async (
  page: number,
  limit: number
): Promise<ProjectResponse> => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }

    const { data } = await tesloApi.get<ProjectResponse>('/projects', {
      params: {
        page: page,
        limit: limit,
      },
    })

    return data
  } catch (error) {
    console.log(error)
    throw new Error('UnAuthorized')
  }
}

//todo: get project by Id

//todo: create project

//todo: update project

//todo: delete project
