import { CustomCard, LayoutGrid, NumberGrid, ProjectSelector } from '@/components'
import { useAuthStore, useProjectStore, useSocket } from '@/store'
import { useEffect, useState } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { LuCheckCheck } from 'react-icons/lu'
import { LuClock4 } from 'react-icons/lu'
import { MdOutlineSavings } from 'react-icons/md'

interface ProjectStatusProp {
  collected: number
  goal: number
  reserved: number
  pending: number
  sold: number
  grid: {
    number: string
    ticket: string
    status: string
    ownerData: {
      name: string
      dni: string
      phone1: string
    }
  }[]
}

export const UserOverviewPage = () => {
  // ResellerOverviewPage
  const { socket } = useSocket()
  const user = useAuthStore((state) => state.user)

  //stores
  const selectedProject = useProjectStore((state) => state.selectedProject)
  const projectStatus = useProjectStore((state) => state.status as ProjectStatusProp)
  const getStatus = useProjectStore((state) => state.getStatus)
  const [_status, setProjectStatus] = useState<ProjectStatusProp>({
    collected: 0,
    goal: 0,
    reserved: 0,
    pending: 0,
    sold: 0,
    grid: [],
  })

  /*
  useEffect(() => {
    if (selectedProject?.id) {
      getStatus(selectedProject.id);
    }
    setNewTicket([]);
  }, [getStatus, selectedProject]);
  */

  // Escucha socket para actualizaciones en tiempo real
  useEffect(() => {
    if (socket) {
      socket.on('project-status', (data: ProjectStatusProp) => {
        setProjectStatus(data)
      })
      return () => {
        socket.off('project-status')
      }
    }
  }, [socket])

  // Cada vez que cambie el proyecto seleccionado, pide su status
  useEffect(() => {
    if (selectedProject?.id) {
      getStatus(selectedProject.id)
    }
  }, [getStatus, selectedProject])

  // Llama a getStatus periódicamente (ej. cada 5s) si hay proyecto
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedProject?.id) {
        getStatus(selectedProject.id)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [getStatus, selectedProject])

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

      <CustomCard
        className={'border-l-8 border-blue-400'}
        title={'Apartados'}
        icon={<LuClock4 />}
        textInfo={[(projectStatus?.reserved || 0).toString(), 'tickets']}
      />

      <CustomCard
        className={'border-l-8 border-orange-400'}
        title={'Pendientes'}
        icon={<LuClock4 />}
        textInfo={[(projectStatus?.pending || 0).toString(), 'tickets']}
      />

      <CustomCard
        className={'border-l-8 border-green-400'}
        title={'Pagados'}
        icon={<LuCheckCheck />}
        textInfo={[`${projectStatus?.sold || 0}/${projectStatus?.grid?.length / (selectedProject?.raffleConfig?.perTicket || 1)}`, 'tickets']}
      />

      <CustomCard
        className={'border-l-8 border-gray-400'}
        title={'Número/s por ticket'}
        icon={<LuCheckCheck />}
        textInfo={[`${selectedProject?.raffleConfig?.perTicket || 0}`, '']}
      />

      <CustomCard
        className={'hidden sm:flex'}
        title={'Precio del Ticket'}
        icon={<LuCheckCheck />}
        textInfo={[`${selectedProject?.raffleConfig.priceTicket || 0}`, '$ c/u']}
      />

      <CustomCard className={''} title={'Total Recaudado'} icon={<MdOutlineSavings />} textInfo={[(projectStatus?.collected || 0).toString(), '$']} />

      <CustomCard className={''} title={'Meta Recaudación'} icon={<AiOutlineFlag />} textInfo={[(projectStatus?.goal || 0).toString(), '$']} />

      {/* Tabla / Grid de números  */}
      <NumberGrid projectStatus={projectStatus} selectedProject={selectedProject} />
    </LayoutGrid>
  )
}
