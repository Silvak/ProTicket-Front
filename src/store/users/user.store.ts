//import type { AuthStatus, User } from "@/contracts";
import { getUsers } from '@/services/user.service'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface UserState {
  data: object
  page: number
  limit: number

  getUser: (userId: string) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

const storeApi: StateCreator<UserState> = (set, get) => ({
  data: {},
  page: 1,
  limit: 3,

  getUser: async (userId: string) => {
    try {
      const data = await getUsers(userId, get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },
  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),
})

export const useUserStore = create<UserState>()(
  devtools(persist(storeApi, { name: 'user-storage' }))
)
