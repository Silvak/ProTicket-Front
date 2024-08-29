import { ErrorBox, LayoutGrid, ProjectMetrics, TicketsTablet } from '@/components'
import { useProjectStore } from '@/store'
import { useParams } from 'react-router-dom'

export const UserDetailProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const selectedProject = useProjectStore((state) => state.selectedProject)

  if (!selectedProject)
    return <ErrorBox title={'Error'} message={'No se ha encontrado la rifa.'} />
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">RIFA OVERVIEW</h1>
      </div>

      {/* Project summary */}
      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        Resumen
      </div>

      {/* Related tickets */}
      <ProjectMetrics />

      <TicketsTablet projectId={projectId} />
    </LayoutGrid>
  )
}
