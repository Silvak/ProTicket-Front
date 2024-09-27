import { tesloApi } from '@/api/teslo'
import type { TicketCreate, TicketUpdate } from '@/contracts'
import { useAuthStore } from '@/store'
import { AxiosError } from 'axios'

//----------------------------------------------------- GET LIST ---------------------------------------------------------
export const getTickets = async (projectId: string, page: number, limit: number) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const response = await tesloApi.get(`/tickets/list/${projectId}`, {
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
export const getTicketById = async (ticketId: string, isPublic: boolean) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    //${isPublic ? "/public/tickets/" : "/tickets/"}
    const response = await tesloApi.get(
      `${isPublic ? '/public/ticket/' : '/tickets/'}${ticketId}`,
      {
        headers: headers,
      }
    )

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

export const createTicket = async (ticket: TicketCreate) => {
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
      number: ticket.number.toString(),
      project: ticket.project,
      seller: ticket.seller,
      'ownerData[name]': ticket.ownerData.name,
      'ownerData[dni]': ticket.ownerData.dni,
      'ownerData[phone1]': ticket.ownerData.phone1,
      'ownerData[phone2]': ticket.ownerData.phone2 ?? '',
      'ownerData[address]': ticket.ownerData.address,
      'ownerData[other]': ticket.ownerData.other ?? '',
    }).toString()

    const response = await tesloApi.post('/tickets', data, { headers })

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

export const updateTicket = async (ticket: TicketUpdate) => {
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
      id: ticket.id,
      'ownerData[name]': ticket.ownerData.name,
      'ownerData[dni]': ticket.ownerData.dni,
      'ownerData[phone1]': ticket.ownerData.phone1,
      'ownerData[phone2]': ticket.ownerData.phone2 ?? '',
      'ownerData[address]': ticket.ownerData.address,
      'ownerData[other]': ticket.ownerData.other ?? '',
      state: ticket.state ?? '',
    }).toString()

    const response = await tesloApi.put('/tickets', data, {
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
export const deleteTicket = async (projectId: string) => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('UnAuthorized')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const data = new URLSearchParams({ id: projectId }).toString()
    const response = await tesloApi.delete('/tickets', {
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
