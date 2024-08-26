import { tesloApi } from '@/api/teslo'
import type { HistoryCreate, HistoryUpdate } from '@/contracts'
import { useAuthStore } from '@/store'
import { AxiosError } from 'axios'

//----------------------------------------------------- GET LIST ---------------------------------------------------------
export const getHistory = async (ticketId: string, page: number, limit: number) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const response = await tesloApi.get(`/history/list/${ticketId}`, {
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

//----------------------------------------------------- BY ID ---------------------------------------------------------
export const getHistoryById = async (historyId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await tesloApi.get(`/history/${historyId}`, {
      headers,
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

//----------------------------------------------------- CREATE ---------------------------------------------------------

export const createHistory = async (history: HistoryCreate) => {
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
      note: history.note,
      date: history.date,
      dolarAmount: history.dolarAmount,
      amount: history.amount,
      badge: history.badge,
      paymentType: history.paymentType,
      ref: history.ref,
      ticket: history.ticket,
      seller: history.seller,
    }).toString()

    const response = await tesloApi.post('/history', data, { headers })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to create project')
  }
}

//----------------------------------------------------- UPDATE ---------------------------------------------------------

export const updateHistory = async (history: HistoryUpdate) => {
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
      id: history.id,
      note: history.note,
      date: history.date,
      dolarAmount: history.dolarAmount,
      amount: history.amount,
      badge: history.badge,
      paymentType: history.paymentType,
      ref: history.ref,
      ticket: history.ticket,
      seller: history.seller,
    }).toString()

    const response = await tesloApi.put('/history', data, {
      headers,
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to update project')
  }
}

//----------------------------------------------------- DELETE ---------------------------------------------------------
export const deleteHistory = async (historyId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const data = new URLSearchParams({ id: historyId }).toString()
    const response = await tesloApi.delete('/history', {
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
