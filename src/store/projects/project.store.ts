import type { ProjectProp } from '@/contracts'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '@/services/project.service'
import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ProjectState {
  selectedProject: object
  data: object
  page: number
  limit: number

  getProjects: (projectId?: string) => Promise<void>
  createProject: (projectData: ProjectProp) => Promise<void>
  updateProject: (projectData: ProjectProp) => Promise<void>
  deleteProject: (projectID: string) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

const storeApi: StateCreator<ProjectState> = (set, get) => ({
  selectedProject: {},
  data: {},
  page: 1,
  limit: 5,

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

  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),
})

export const useProjectStore = create<ProjectState>()(
  devtools(persist(storeApi, { name: 'project-storage' }))
)
