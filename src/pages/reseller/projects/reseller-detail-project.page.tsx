import { ErrorBox, LayoutGrid, TicketsTablet } from '@/components'
import { UpdateProjectMembersForm } from '@/components/form/updateProjectMembers.form'
import { useProjectStore } from '@/store'
import { useParams } from 'react-router-dom'

export const ResellerDetailProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const selectedProject = useProjectStore((state) => state.selectedProject)

  if (!selectedProject)
    return <ErrorBox title={'Error'} message={'No se ha encontrado la rifa.'} />
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold"> Detalles Rifa </h1>
      </div>

      {/* Project summary */}
      <div className="bg-white  rounded-xl p-4 col-span-1 mb-6 sm:col-span-2 md:col-span-3 xl:col-span-6">
        Resumen de la rifa
        <p>{selectedProject.id}</p>
        <p>{selectedProject.name}</p>
        <p>{selectedProject.raffleConfig.perTicket}</p>
        <p>{selectedProject.raffleConfig.priceTicket}</p>
        <p>{selectedProject.raffleConfig.totalTickets}</p>
        <p>{selectedProject.date.start}</p>
        <p>{selectedProject.date.end}</p>
        <p>{selectedProject.state}</p>
      </div>

      <div className="bg-white  rounded-xl p-4 col-span-1 mb-6 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <UpdateProjectMembersForm project={selectedProject} />
      </div>

      <TicketsTablet projectId={projectId} />
    </LayoutGrid>
  )
}
