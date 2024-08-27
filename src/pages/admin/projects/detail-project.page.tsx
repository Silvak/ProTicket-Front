import {
  ErrorBox,
  LayoutGrid,
  ProjectMetrics,
  RaffleDisplay,
  TicketsTablet,
} from '@/components'
import { UpdateProjectForm } from '@/components/form/updateProject.form'
import { useProjectStore } from '@/store'
import { useParams } from 'react-router-dom'

export const DetailProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const selectedProject = useProjectStore((state) => state.selectedProject)

  if (!selectedProject)
    return <ErrorBox title={'Error'} message={'No se ha encontrado la rifa.'} />
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">PROYECTO OVERVIEW</h1>
      </div>

      {/* ticket view */}
      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <RaffleDisplay
          id={selectedProject?.id || ''}
          number="0001"
          price={selectedProject?.raffleConfig?.priceTicket || 0}
          qr="https://example.com/qr-code.png"
          numberPosition={selectedProject?.raffleConfig?.numberPosition}
          qrPosition={selectedProject?.raffleConfig?.qrPosition}
          img={
            selectedProject?.raffleConfig?.img ||
            'https://www.tarjetasinnovadoras.com/wp-content/uploads/2023/11/BOLETAS-RIFA-4x0-F4.webp'
          }
        />
      </div>

      {/* update form */}
      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        {selectedProject && <UpdateProjectForm project={selectedProject} />}
      </div>

      {/* Related tickets */}
      <ProjectMetrics />

      <TicketsTablet projectId={projectId} />
    </LayoutGrid>
  )
}
