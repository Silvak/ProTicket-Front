import type { AuthStatus, User } from '@/contracts'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface AuthState {
  status: AuthStatus
  token?: string
  user?: User
  isLoggedIn: boolean
  //setAuthState: (authState: Partial<AuthState>) => void;
}

const storeApi: StateCreator<AuthState> = (_set) => ({
  status: 'authorized',
  token: undefined,
  user: undefined,
  isLoggedIn: false,
  //setAuthState: (authState) => set((state) => ({ ...state, ...authState })),
})

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
)
