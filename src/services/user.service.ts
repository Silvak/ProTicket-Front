import { tesloApi } from '@/api/teslo'
import type { ResellerCreate, UserCreate, UserUpdate } from '@/contracts'
//import type { UserResponse } from "@/contracts";
import { useAuthStore } from '@/store'
import { AxiosError } from 'axios'

export const getUsers = async (userId: string, page: number, limit: number) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await tesloApi.get(`/users/related/${userId}`, {
      headers,
      params: {
        page: page,
        limit: limit,
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('UnAuthorized')
  }
}

export const getRelatedUsers = async (userId: string, page: number, limit: number) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await tesloApi.get(`/users/related/${userId}`, {
      headers,
      params: {
        page: page,
        limit: limit,
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('UnAuthorized')
  }
}

export const getUserById = async (userId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const { data: projectData } = await tesloApi.get(`/users/${userId}`, {
      headers,
    })
    return projectData
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

export const createUser = async (user: UserCreate) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = new URLSearchParams({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      img: user.img,
      creatorId: user.creatorId,
    }).toString()

    const response = await tesloApi.post('/users', data, { headers })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to create project')
  }
}

export const createReseller = async (user: ResellerCreate) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = new URLSearchParams({
      name: user.name,
      email: user.email,
      password: user.password,
      creatorId: user.creatorId,
    }).toString()

    const response = await tesloApi.post('/users/reseller', data, { headers })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to create project')
  }
}

export const updateUser = async (user: UserUpdate) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = new URLSearchParams({
      id: user.id,
      name: user.name,
      phone: user.phone,
      img: user.img,
      state: user.state,
    }).toString()

    const response = await tesloApi.put('/users', data, { headers })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to create project')
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const data = new URLSearchParams({ id: userId }).toString()
    const response = await tesloApi.delete('/users', {
      headers,
      data,
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to delete project')
  }
}
