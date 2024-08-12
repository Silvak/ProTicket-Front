import { tesloApi } from '@/api/teslo'
import type { UserResponse } from '@/contracts'
import { useAuthStore } from '@/store'

export const getUsers = async (page: number, limit: number): Promise<UserResponse> => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }

    const { data } = await tesloApi.get('/users', {
      params: {
        page: page,
        limit: limit,
      },
    })

    return data
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
