import { LayoutGrid, RaffleDisplay } from '@/components'
import { UpdateProjectForm } from '@/components/form/updateProject.form'
import type { ProjectProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const DetailProjectsPage = () => {
  const { id } = useParams()
  const project = useProjectStore((state) => state.selectedProject) as ProjectProp
  const relatedTickets = useProjectStore((state) => state.tickets)
  const getProjects = useProjectStore((state) => state.getProjects)
  const getRelatedTickets = useProjectStore((state) => state.getRelatedTickets)

  useEffect(() => {
    if (id) {
      getProjects(id) // Cargar el proyecto por ID
      getRelatedTickets(id)
    }
  }, [id, getProjects, getRelatedTickets])

  console.log(relatedTickets)

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
          price={project?.raffleConfig?.priceTicket || 0} // Cambiado `price` a `priceTicket`
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

      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12 mt-8">
        tickets
      </div>
    </LayoutGrid>
  )
}
