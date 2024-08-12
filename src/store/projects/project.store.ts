import type { ProjectProp } from '@/contracts'
import { createProject, getProjects } from '@/services/project.service'
//import type { AuthStatus, User } from "@/contracts";
import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ProjectState {
  data: object
  page: number
  limit: number
  selectedProject: object

  getProjects: () => Promise<void>
  createProject: (projectData: ProjectProp) => Promise<void>
  setSelectedProject: () => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

const storeApi: StateCreator<ProjectState> = (set, get) => ({
  selectedProject: {},
  data: {},
  page: 1,
  limit: 3,

  createProject: async (projectData: ProjectProp) => {
    try {
      const data = await createProject(projectData)
      return console.log(data)
    } catch (_error) {
      console.log(_error)
    }
  },
  getProjects: async () => {
    try {
      const data = await getProjects(get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },
  setSelectedProject: async () => set({}),
  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),
})

export const useProjectStore = create<ProjectState>()(
  devtools(persist(storeApi, { name: 'project-storage' }))
)
