import { apiRequest, apiRequestFormData } from '@/api/request'
import type { ProjectMemberProp, ProjectProp, ProjectResponse } from '@/contracts'

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getProjects = async (page: number, limit: number): Promise<ProjectResponse> => {
  return apiRequest<ProjectResponse>({
    url: '/projects',
    method: 'get',
    params: { page, limit },
  })
}

export const getProjectById = async (projectId: string): Promise<ProjectProp> => {
  return apiRequest<ProjectProp>({
    url: `/projects/${projectId}`,
    method: 'get',
    params: {},
  })
}

export const getProjectStatus = async (projectId: string): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/status/${projectId}`,
    method: 'get',
    params: {},
  })
}

export const getRelatedProjects = async (projectId: string, page: number, limit: number): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/related/${projectId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getRelatedProjectReseller = async (projectId: string, page: number, limit: number): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/related/reseller/${projectId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getRelatedProjectTickets = async (projectId: string, page: number, limit: number): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/${projectId}/tickets`,
    method: 'get',
    params: { page, limit },
  })
}

//----------------------------------------------------- POST DATA ---------------------------------------------------------
export const createProject = async (projectData: ProjectProp) => {
  const formData = new FormData()

  formData.append('name', projectData.name)
  formData.append('date[start]', projectData.date.start)
  formData.append('date[end]', projectData.date.end)
  formData.append('raffleConfig[priceTicket]', projectData.raffleConfig.priceTicket.toString())
  formData.append('raffleConfig[totalTickets]', projectData.raffleConfig.totalTickets.toString())
  formData.append('raffleConfig[perTicket]', projectData.raffleConfig.perTicket.toString())
  formData.append('raffleConfig[qrPosition]', projectData.raffleConfig.qrPosition)
  formData.append('raffleConfig[numberPosition]', projectData.raffleConfig.numberPosition)
  formData.append('raffleConfig[orientation]', projectData.raffleConfig.orientation)
  formData.append('raffleConfig[prizesList]', JSON.stringify(projectData.raffleConfig.prizesList))
  formData.append('owner', projectData.owner.id as string)
  formData.append('state', projectData.state.join(','))

  // if image is not null
  if (projectData.image) {
    formData.append('image', projectData.image)
  }

  return apiRequestFormData({
    url: '/projects',
    method: 'post',
    data: formData,
  })
}

//----------------------------------------------------- UPDATE DATA ---------------------------------------------------------
export const updateProject = async (projectData: ProjectProp) => {
  const formData = new FormData()

  formData.append('id', projectData.id as string)
  formData.append('name', projectData.name)
  formData.append('date[start]', projectData.date.start)
  formData.append('date[end]', projectData.date.end)
  formData.append('raffleConfig[priceTicket]', projectData.raffleConfig.priceTicket.toString())
  formData.append('raffleConfig[totalTickets]', projectData.raffleConfig.totalTickets.toString())
  formData.append('raffleConfig[perTicket]', projectData.raffleConfig.perTicket.toString())
  formData.append('raffleConfig[qrPosition]', projectData.raffleConfig.qrPosition)
  formData.append('raffleConfig[numberPosition]', projectData.raffleConfig.numberPosition)
  formData.append('raffleConfig[orientation]', projectData.raffleConfig.orientation)
  formData.append('raffleConfig[prizesList]', JSON.stringify(projectData.raffleConfig.prizesList))
  formData.append('owner', projectData.owner.id as string)
  formData.append('state', projectData.state.join(','))

  // if image is not null
  if (projectData.image) {
    formData.append('image', projectData.image)
  }

  return apiRequestFormData({
    url: '/projects',
    method: 'put',
    data: formData,
  })
}

export const updateProjectMember = async (projectData: ProjectMemberProp) => {
  return apiRequest({
    url: '/projects/members',
    method: 'put',
    data: new URLSearchParams({
      id: projectData.id as string,
      members: JSON.stringify(projectData.members),
    }),
  })
}

//----------------------------------------------------- DELETE DATA ---------------------------------------------------------
export const deleteProject = async (projectId: string) => {
  return apiRequest({
    url: '/projects',
    method: 'delete',
    data: new URLSearchParams({ id: projectId }).toString(),
  })
}
