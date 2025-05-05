// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

export type UserRole = 'admin' | 'instructor' | 'staff'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await api.post('/auth/login', { email, password })
          const { token, user } = data
          // configura o header para as próximas requisições
          api.defaults.headers.common.Authorization = `Bearer ${token}`
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Erro ao fazer login',
            isLoading: false,
          })
          throw err  // garante que o catch no componente seja acionado
        }
      },

      logout: () => {
        delete api.defaults.headers.common.Authorization
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
