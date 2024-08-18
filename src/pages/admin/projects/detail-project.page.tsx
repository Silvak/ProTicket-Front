import { LayoutGrid } from '@/components'
import { UpdateProjectForm } from '@/components/form/updateProject.form'
import type { ProjectProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const DetailProjectsPage = () => {
  const { id } = useParams()
  const project = useProjectStore((state) => state.selectedProject) as ProjectProp
  const getProjects = useProjectStore((state) => state.getProjects)

  useEffect(() => {
    if (id) {
      getProjects(id) // Cargar el proyecto por ID
    }
  }, [id, getProjects])

  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">PROYECTO OVERVIEW</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        {project && <UpdateProjectForm project={project} />}
      </div>
    </LayoutGrid>
  )
}
