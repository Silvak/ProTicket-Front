import { tesloApi } from '@/api/teslo'
import type { ProjectProp, ProjectResponse } from '@/contracts'
import { useAuthStore } from '@/store'
import { AxiosError } from 'axios'

//----------------------------------------------------- GET LIST ---------------------------------------------------------
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

//----------------------------------------------------- BY ID ---------------------------------------------------------
export const getProjectById = async (projectId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const data = new URLSearchParams({ id: projectId }).toString()
    const { data: projectData } = await tesloApi.post<ProjectProp>('/projects/id', data, {
      headers,
    })
    return projectData
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

//----------------------------------------------------- CREATE ---------------------------------------------------------
export const createProject = async (projectData: ProjectProp) => {
  try {
    console.log(projectData)
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data2 = new URLSearchParams({
      name: projectData.name,
      'date[start]': projectData.date.start,
      'date[end]': projectData.date.end,
      'raffleConfig[img]': projectData.raffleConfig.img || '',
      'raffleConfig[priceTicket]': projectData.raffleConfig.priceTicket.toString(),
      'raffleConfig[totalTickets]': projectData.raffleConfig.totalTickets.toString(),
      'raffleConfig[perTicket]': projectData.raffleConfig.perTicket.toString(),
      'raffleConfig[qrPosition]': projectData.raffleConfig.qrPosition,
      'raffleConfig[numberPosition]': projectData.raffleConfig.numberPosition,
      owner: projectData.owner.id as string, // Cambia esto
      state: projectData.state.join(','),
    }).toString()

    const { data } = await tesloApi.post('/projects', data2, { headers })

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to create project')
  }
}

//----------------------------------------------------- UPDATE ---------------------------------------------------------
export const updateProject = async (projectData: ProjectProp) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = new URLSearchParams({
      id: projectData.id as string,
      name: projectData.name,
      'date[start]': projectData.date.start,
      'date[end]': projectData.date.end,
      'raffleConfig[img]': projectData.raffleConfig.img || '',
      'raffleConfig[priceTicket]': projectData.raffleConfig.priceTicket.toString(),
      'raffleConfig[totalTickets]': projectData.raffleConfig.totalTickets.toString(),
      'raffleConfig[perTicket]': projectData.raffleConfig.perTicket.toString(),
      'raffleConfig[qrPosition]': projectData.raffleConfig.qrPosition,
      'raffleConfig[numberPosition]': projectData.raffleConfig.numberPosition,
      owner: projectData.owner.id as string, // Cambia esto
      state: projectData.state.join(','),
    }).toString()

    const { data: updatedProject } = await tesloApi.put('/projects', data, {
      headers,
    })
    return updatedProject
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to update project')
  }
}

//----------------------------------------------------- DELETE ---------------------------------------------------------
export const deleteProject = async (projectId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const data = new URLSearchParams({ id: projectId }).toString()
    const response = await tesloApi.delete('/projects', {
      headers,
      data,
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to delete project')
  }
}
