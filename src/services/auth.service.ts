import { tesloApi } from '@/api/teslo'
import type { User } from '@/contracts'
import { AxiosError } from 'axios'

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const { data } = await tesloApi.post<User>('/auth/login', {
      email,
      password,
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }

    console.log(error)
    throw new Error('Unable to login')
  }
}

export const checkStatus = async (): Promise<User> => {
  try {
    const { data } = await tesloApi.get<User>('/auth/check-status')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('UnAuthorized')
  }
}
