import { apiRequest } from '@/api/request'

interface StatusRes {
  status: string
  qr: string
}

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getWsStatus = async (): Promise<StatusRes> => {
  return apiRequest<StatusRes>({
    url: 'notificacions/ws-status',
    method: 'get',
    params: {},
  })
}

export const wsDisconnect = async (): Promise<StatusRes> => {
  return apiRequest<StatusRes>({
    url: '/notificacions/ws-disconnect',
    method: 'post',
    params: {},
  })
}
