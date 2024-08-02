import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface SidebarState {
  isOpen: boolean
  setOpen: () => void
}

const storeApi: StateCreator<SidebarState> = (set) => ({
  isOpen: true,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
})

export const useSidebarStore = create<SidebarState>()(
  devtools(persist(storeApi, { name: 'sidebar-storage' }))
)
