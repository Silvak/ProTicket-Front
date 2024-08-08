//import type { AuthStatus, User } from "@/contracts";
import { getProjects } from '@/services/project.service'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface ProjectState {
  data: object
  page: number
  limit: number
  getProjects: () => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

const storeApi: StateCreator<ProjectState> = (set, get) => ({
  data: {},
  page: 1,
  limit: 5,

  getProjects: async () => {
    try {
      const data = await getProjects(get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },
  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ page: limit }),
})

export const useProjectStore = create<ProjectState>()(
  devtools(persist(storeApi, { name: 'project-storage' }))
)
