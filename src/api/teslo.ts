import { useAuthStore, useHistoryStore, useProjectStore, useTicketStore, useUserStore } from '@/store'
import axios from 'axios'

const tesloApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

// Todo: interceptors
// read zutand store
tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  //console.log({ token })

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Interceptor de respuesta para manejar expiración del JWT
tesloApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore.getState()
    const cleanHistoryData = useHistoryStore.getState().cleanHistoryData
    const cleanTicketsData = useTicketStore.getState().cleanTicketsData
    const cleaProjectData = useProjectStore.getState().cleanProjectData
    const cleanUserData = useUserStore.getState().cleanUserData

    if (error.response && error.response.status === 401) {
      // Si el error es 401, el token ha expirado o es inválido

      authStore.logoutUser() // Llamar al método de logout en la store
      cleanHistoryData() // Limpiar el store de historias
      cleanTicketsData() // Limpiar el store de tickets
      cleaProjectData() // Limpiar el store de proyectos
      cleanUserData() // Limpiar el store de usuarios
      // Puedes redirigir al usuario a la página de login si es necesario
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export { tesloApi }
