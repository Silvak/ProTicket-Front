import type { ProjectMemberProp, ProjectProp } from '@/contracts'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectStatus,
  getProjects,
  getRelatedProjectReseller,
  getRelatedProjectTickets,
  getRelatedProjects,
  updateProject,
  updateProjectMember,
} from '@/services/project.service'
import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ProjectState {
  selectedProject: ProjectProp | null
  data: object
  tickets: object
  page: number
  limit: number
  status: object

  getProjects: (projectId?: string) => Promise<void>
  getStatus: (projectId: string) => Promise<void>
  getRelatedProjects: (projectId: string) => Promise<void>
  getRelatedProjectReseller: (projectId: string) => Promise<void>
  getRelatedTickets: (projectId: string) => Promise<void>
  createProject: (projectData: ProjectProp) => Promise<void>
  updateProject: (projectData: ProjectProp) => Promise<void>
  updateProjectMember: (projectData: ProjectMemberProp) => Promise<void>
  deleteProject: (projectID: string) => Promise<void>
  cleanSelectedProject: () => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  cleanProjectData: () => void
}

const storeApi: StateCreator<ProjectState> = (set, get) => ({
  selectedProject: null,
  data: {},
  tickets: {},
  page: 1,
  limit: 5,
  status: {},

  getProjects: async (projectId?: string) => {
    if (projectId !== undefined) {
      const data = await getProjectById(projectId)
      set({ selectedProject: data })
    } else {
      try {
        const data = await getProjects(get().page, get().limit)
        set({ data: data })
      } catch (_error) {
        set({ data: {} })
      }
    }
  },

  getStatus: async (projectId: string) => {
    try {
      const data = await getProjectStatus(projectId)
      set({ status: data })
    } catch (_error) {
      set({ status: {} })
    }
  },

  getRelatedProjects: async (projectId: string) => {
    try {
      const data = await getRelatedProjects(projectId, get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },

  getRelatedProjectReseller: async (projectId: string) => {
    try {
      const data = await getRelatedProjectReseller(projectId, get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },

  getRelatedTickets: async (projectId: string) => {
    try {
      const data = await getRelatedProjectTickets(projectId, get().page, get().limit)
      set({ tickets: data })
    } catch (_error) {
      set({ tickets: {} })
    }
  },

  createProject: async (projectData: ProjectProp) => {
    try {
      const res = await createProject(projectData)
      if (res) {
        await get().getProjects()
      }
    } catch (_error) {
      throw 'Create Error'
    }
  },

  updateProject: async (projectData: ProjectProp) => {
    try {
      const res = await updateProject(projectData)
      if (res) {
        await get().getProjects(projectData.id)
      }
    } catch (_error) {
      throw 'Update error'
    }
  },

  updateProjectMember: async (projectData) => {
    try {
      const res = await updateProjectMember(projectData)
      if (res) {
        await get().getProjects(projectData.id)
      }
    } catch (_error) {
      throw 'Update member error'
    }
  },

  deleteProject: async (projectID: string) => {
    try {
      const res = await deleteProject(projectID)
      if (res) {
        await get().getProjects()
      }
    } catch (_error) {
      throw 'Delete error'
    }
  },
  cleanSelectedProject: () => set({ selectedProject: null }),
  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),

  cleanProjectData: () => set({ data: {}, selectedProject: null, tickets: {} }),
})

export const useProjectStore = create<ProjectState>()(
  devtools(persist(storeApi, { name: 'project-storage' }))
)
