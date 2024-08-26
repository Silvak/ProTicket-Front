import { LayoutGrid, RaffleDisplay, TicketsTablet } from '@/components'
import { UpdateProjectForm } from '@/components/form/updateProject.form'
import type { TicketTabletProp } from '@/contracts'
import { useProjectStore, useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const DetailProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [loading, setLoading] = useState(true)

  const project = useProjectStore((state) => state.selectedProject)
  const tickets = useTicketStore((state) => state.data as TicketTabletProp)
  const getProjects = useProjectStore((state) => state.getProjects)
  const getTickets = useTicketStore((state) => state.getTickets)

  useEffect(() => {
    const fetchData = async () => {
      if (projectId !== undefined) {
        await getProjects(projectId)
        await getTickets(projectId)
        setLoading(false)
      }
    }
    fetchData()
  }, [projectId, getProjects, getTickets])

  if (loading) return <div>Loading...</div>
  if (!project) return <div>Error: No project found</div>
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">PROYECTO OVERVIEW</h1>
      </div>

      {/* ticket view */}
      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <RaffleDisplay
          id={project?.id || ''}
          number="0001"
          price={project?.raffleConfig?.priceTicket || 0}
          qr="https://example.com/qr-code.png"
          numberPosition={project?.raffleConfig?.numberPosition}
          qrPosition={project?.raffleConfig?.qrPosition}
          img={
            project?.raffleConfig?.img ||
            'https://www.tarjetasinnovadoras.com/wp-content/uploads/2023/11/BOLETAS-RIFA-4x0-F4.webp'
          }
        />
      </div>

      {/* update form */}
      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        {project && <UpdateProjectForm project={project} />}
      </div>

      {/* Related tickets */}
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12 mt-8">
        <h1 className="text-xl font-bold">TIKETS</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Total de tickets</h4>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Vendidos</h4>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Pendientes</h4>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Canelados</h4>
        </div>
      </div>

      <TicketsTablet
        limit={tickets?.limit}
        page={tickets?.page}
        tickets={tickets?.tickets}
        total={tickets?.total}
      />
    </LayoutGrid>
  )
}
