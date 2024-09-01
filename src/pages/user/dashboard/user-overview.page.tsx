import { CustomCard, LayoutGrid, ProjectSelector } from '@/components'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useProjectStore } from '@/store'
import { useEffect } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { LuCheckCheck } from 'react-icons/lu'
import { LuClock4 } from 'react-icons/lu'
import { MdOutlineSavings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface ProjectStatusPro {
  collected: number
  goal: number
  pending: number
  sold: number
  grid: {
    number: string
    ticket: string
    status: string
  }[]
}

export const UserOverviewPage = () => {
  const navigate = useNavigate()
  const rolePath = useUserRole()
  const user = useAuthStore((state) => state.user)
  const status = useProjectStore((state) => state.status as ProjectStatusPro)
  const selectProject = useProjectStore((state) => state.selectedProject)
  const getStatus = useProjectStore((state) => state.getStatus)

  useEffect(() => {
    getStatus(selectProject?.id || '')
  }, [getStatus, selectProject])

  const handleTicketClick = (ticketId: string) => {
    if (ticketId) {
      navigate(`/${rolePath}/ticket-detail/${ticketId}`)
    } else {
      console.log('No ticket ID')
    }
  }

  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <p className="">
          ¡Bienvenid@ <span className="font-semibold">{user?.name}</span>!
        </p>

        <h1 className="text-2xl font-semibold">Estadísticas</h1>
      </div>

      <div className="flex lg:justify-end  items-center h-full  rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <ProjectSelector />
      </div>

      {/*
      <CustomCard
        className={""}
        title={"Miembros"}
        icon={<FiUsers />}
        textInfo={["0", "reseller"]}
      />
      */}

      <CustomCard
        className={''}
        title={'Pendientes'}
        icon={<LuClock4 />}
        textInfo={[(status?.pending || 0).toString(), 'tickets']}
      />

      <CustomCard
        className={''}
        title={'Vendidos'}
        icon={<LuCheckCheck />}
        textInfo={[`${status?.sold || 0}/${status.grid.length}`, 'tickets']}
      />

      <CustomCard
        className={''}
        title={'Total Recaudado'}
        icon={<MdOutlineSavings />}
        textInfo={[(status?.collected || 0).toString(), '$']}
      />

      <CustomCard
        className={''}
        title={'Meta Recaudación'}
        icon={<AiOutlineFlag />}
        textInfo={[(status?.goal || 0).toString(), '$']}
      />

      <div className="flex flex-col  rounded-xl p-0 mt-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold text-gray-500">
          Tabla de: <span className="text-gray-900">{selectProject?.name}</span>
        </h1>
      </div>

      <div className="flex flex-col bg-white rounded-xl p-4 col-span-1 sm:col-span-2 md:col-span-6  xl:col-span-12 min-h-[120px]">
        <div className="flex flex-wrap gap-3 justify-between  max-h-[500px] overflow-y-scroll">
          {status.grid.length > 0 ? (
            status.grid.map((item) => (
              <button
                key={item.number}
                type="button"
                onClick={() => handleTicketClick(item.ticket)}
                className={`
                ${item.status === 'PAID' && 'bg-green-200'} 
                ${item.status === 'UNPAID' && 'bg-orange-200'}
                ${item.status === 'PAID' && 'bg-green-800'}
                flex flex-col justify-center items-center h-[68px] w-[68px] border rounded-md overflow-hidden bg-gray-50 cursor-pointer text-sm`}
              >
                {item.number.split('-').map((num) => (
                  <p key={num}>{num}</p>
                ))}
              </button>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-[120px]">
              No hay tickets
            </div>
          )}
        </div>
      </div>
    </LayoutGrid>
  )
}
