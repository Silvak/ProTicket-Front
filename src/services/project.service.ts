import { tesloApi } from '@/api/teslo'
import type { ProjectList, ProjectProp } from '@/contracts'
import { useAuthStore } from '@/store'

export interface ProjectResponse {
  page: number
  limit: number
  total: number
  next: string
  prev: string
  projects: ProjectList[]
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

export const getProjectById = async () => {
  return console.log('GET:  project by ID')
}

export const createProject = async (projectData: ProjectProp) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const { data } = await tesloApi.post('/projects', projectData, { headers })

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create project')
  }
}

export const updateProject = async () => {
  return console.log('PUT: update project')
}

export const deleteProject = async () => {
  return console.log('DELETE: delete project')
}
