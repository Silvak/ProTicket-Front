import { tesloApi } from '@/api/teslo'
import type { ProjectMemberProp, ProjectProp, ProjectResponse } from '@/contracts'
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
    }
    const { data: projectData } = await tesloApi.get<ProjectProp>(
      `/projects/${projectId}`,
      {
        headers,
      }
    )
    return projectData
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

//----------------------------------------------------- STATUS ---------------------------------------------------------
export const getProjectStatus = async (projectId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await tesloApi.get(`/projects/status/${projectId}`, {
      headers,
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

//----------------------------------------------------- REALTED PROJECTS ---------------------------------------------------------
export const getRelatedProjects = async (
  projectId: string,
  page: number,
  limit: number
) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await tesloApi.get(`/projects/related/${projectId}`, {
      headers,
      params: {
        page: page,
        limit: limit,
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

export const getRelatedProjectReseller = async (
  projectId: string,
  page: number,
  limit: number
) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await tesloApi.get(`/projects/related/reseller/${projectId}`, {
      headers,
      params: {
        page: page,
        limit: limit,
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

//----------------------------------------------------- REALTED ID ---------------------------------------------------------
export const getRelatedProjectTickets = async (
  projectId: string,
  page: number,
  limit: number
) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const { data } = await tesloApi.get<ProjectResponse>(
      `/projects/${projectId}/tickets`,
      {
        headers,
        params: {
          page: page,
          limit: limit,
        },
      }
    )
    return data
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
      owner: projectData.owner.id as string,
      state: projectData.state.join(','),
    }).toString()

    const { data } = await tesloApi.post('/projects', data2, { headers })

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || 'Error al crear rifa'
      throw new Error(errorMessage)
    }
    throw new Error('Fallo al crear rifa')
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
      'raffleConfig[img]': projectData.raffleConfig.img,
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

export const updateProjectMember = async (projectData: ProjectMemberProp) => {
  console.log(projectData)
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    // Convertimos el array 'members' a una cadena JSON
    const formData = new URLSearchParams()
    formData.append('id', projectData.id as string)
    formData.append('members', JSON.stringify(projectData.members))

    console.log(formData.toString())

    const response = await tesloApi.put('/projects/members', formData.toString(), {
      headers,
    })

    const updatedProject = response.data
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
