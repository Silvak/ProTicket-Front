import { tesloApi } from '@/api/teslo'
//import type { UserResponse } from "@/contracts";
import { useAuthStore } from '@/store'

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

export const getUserById = async () => {
  return console.log('GET: project ID')
}

export const createUser = async () => {
  return console.log('POST: create user')
}

export const updateUser = async () => {
  return console.log('PUT: update user')
}

export const deleteUser = async () => {
  return console.log('DELETE: delete user')
}
