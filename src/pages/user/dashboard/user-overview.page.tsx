import { CustomCard, LayoutGrid } from '@/components'
import type { ProjectResponse, UserResponse } from '@/contracts'
import { useAuthStore, useProjectStore, useUserStore } from '@/store'
import { useEffect } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { IoTicketOutline } from 'react-icons/io5'
import { LuCheckCheck } from 'react-icons/lu'
import { LuClock4 } from 'react-icons/lu'
import { MdOutlineSavings } from 'react-icons/md'

function createArray(length: number, interval: number) {
  const adjustedLength = Math.ceil(length / interval) // Calcula el número de intervalos necesarios
  return Array.from({ length: adjustedLength }, (_, index) => {
    const start = index * interval + 1
    const end = Math.min(start + interval - 1, length) // Asegura que el 'end' no exceda 'length'
    return {
      number: interval === 1 ? `${start}` : `${start}-${end}`,
      state: undefined,
      ticketId: '',
    }
  })
}
export const UserOverviewPage = () => {
  const user = useAuthStore((state) => state.user)
  const projects = useProjectStore((state) => state.data) as ProjectResponse
  const getProjects = useProjectStore((state) => state.getProjects)
  const users = useUserStore((state) => state.data as UserResponse)
  const getUser = useUserStore((state) => state.getUser)
  const array = createArray(1000, 2)

  useEffect(() => {
    getProjects()
    getUser()
  }, [getProjects, getUser])

  return (
    <LayoutGrid>
      <div className="flex flex-col  rounded-xl p-0 mb-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <p className="text-sm">
          ¡Bienvenido <span className="font-semibold">{user?.name}</span>!
        </p>

        <h1 className="text-2xl font-semibold">Estadisticas</h1>
      </div>

      <CustomCard
        className={''}
        title={'Total Rifas'}
        icon={<IoTicketOutline />}
        textInfo={[(projects.total || 0).toString(), 'rifas']}
      />

      <CustomCard
        className={''}
        title={'Revendedores'}
        icon={<FiUsers />}
        textInfo={[(users.total || 0).toString(), 'reseller']}
      />

      <CustomCard
        className={''}
        title={'Tickets Pendientes'}
        icon={<LuClock4 />}
        textInfo={['45/100', 'unidades']}
      />

      <CustomCard
        className={''}
        title={'Tickets Vendidos'}
        icon={<LuCheckCheck />}
        textInfo={['12', 'unidades']}
      />

      <CustomCard
        className={''}
        title={'Total Recaudado'}
        icon={<MdOutlineSavings />}
        textInfo={['365', '$']}
      />

      <CustomCard
        className={''}
        title={'Meta Recaudación'}
        icon={<AiOutlineFlag />}
        textInfo={['4500', '$']}
      />

      <div className="flex flex-col  rounded-xl p-0 mt-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Vista Rápida de Rifa</h1>
      </div>

      <div className="flex flex-col bg-white rounded-xl p-4 col-span-1 sm:col-span-2 md:col-span-6  xl:col-span-12 min-h-[120px]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Rifa 1</h3>

          <div>
            Modo de visualización
            <select name="" id="" className="px-4 py-1 border rounded-md">
              <option value="">Opción 1</option>
              <option value="">Opción 2</option>
              <option value="">Opción 3</option>
            </select>
          </div>
        </div>

        {/* grid */}

        <div className="flex flex-wrap gap-2 justify-center mt-5 max-h-[500px] overflow-y-scroll">
          {array.map((item) => (
            <div
              key={item.number}
              className="flex flex-col justify-center items-center h-[68px] w-[68px] border rounded-md overflow-hidden bg-gray-50 cursor-pointer text-sm"
            >
              {item.number.split('-').map((num) => (
                <p key={num}>{num}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </LayoutGrid>
  )
}
