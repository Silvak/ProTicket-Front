import { getWsStatus, wsDisconnect } from '@/services/notification.service'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface MessageState {
  status: string
  qr?: string
  setData: (status: string, qr: string) => void
  getStatus: () => void
  wsDisconnect: () => void
}

const storeApi: StateCreator<MessageState> = (set) => ({
  status: '',
  qr: '',
  setData: (status, qr) => set({ status, qr }),
  getStatus: async () => {
    try {
      const res = await getWsStatus()
      if (res) {
        set({ status: res.status, qr: res.qr })
      }
      console.log(res)
    } catch (_error) {
      throw 'Get estatus error'
    }
  },
  wsDisconnect: async () => {
    try {
      const res = await wsDisconnect()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
})

export const useMessageStore = create<MessageState>()(devtools(persist(storeApi, { name: 'message-storage' })))
