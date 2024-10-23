import { apiRequest, apiRequestFormData } from '@/api/request'
import type { ResellerCreate, UserCreate, UserUpdate } from '@/contracts'

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getUsers = async (
  userId: string,
  page: number,
  limit: number
): Promise<object> => {
  return apiRequest({
    url: `/users/related/${userId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getRelatedUsers = async (
  userId: string,
  page: number,
  limit: number
): Promise<object> => {
  return apiRequest({
    url: `/users/related/${userId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getUserById = async (userId: string): Promise<object> => {
  return apiRequest({
    url: `/users/${userId}`,
    method: 'get',
    params: {},
  })
}

//----------------------------------------------------- POST DATA ---------------------------------------------------------
export const createUser = async (user: UserCreate) => {
  const formData = new FormData()
  formData.append('name', user.name)
  formData.append('email', user.email)
  formData.append('phone', user.phone)
  formData.append('password', user.password)
  formData.append('creatorId', user.creatorId)

  // if image is not null
  if (user.image) {
    formData.append('image', user.image)
  }

  return apiRequestFormData({
    url: '/users',
    method: 'post',
    data: formData,
  })
}

export const createReseller = async (user: ResellerCreate) => {
  const formData = new FormData()
  formData.append('name', user.name)
  formData.append('email', user.email)
  formData.append('password', user.password)
  formData.append('creatorId', user.creatorId)

  // if image is not null
  if (user.image) {
    formData.append('image', user.image)
  }

  return apiRequestFormData({
    url: '/users/reseller',
    method: 'post',
    data: formData,
  })
}

//----------------------------------------------------- UPDATE DATA ---------------------------------------------------------
export const updateUser = async (user: UserUpdate) => {
  const formData = new FormData()
  formData.append('id', user.id)
  formData.append('name', user.name)
  formData.append('phone', user.phone)
  formData.append('state', user.state)

  // if image is not null
  if (user.image) {
    formData.append('image', user.image)
  }

  return apiRequestFormData({
    url: '/users',
    method: 'put',
    data: formData,
  })
}

//----------------------------------------------------- DELETE DATA ---------------------------------------------------------
export const deleteUser = async (userId: string) => {
  return apiRequest({
    url: '/users',
    method: 'delete',
    data: new URLSearchParams({ id: userId }).toString(),
  })
}

export const deleteUserReseller = async (userId: string) => {
  return apiRequest({
    url: '/users/reseller',
    method: 'delete',
    data: new URLSearchParams({ id: userId }).toString(),
  })
}
