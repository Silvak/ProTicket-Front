import type { ProjectTabletProp } from '@/contracts'
import { useAuthStore, useProjectStore } from '@/store'
import { useEffect, useState } from 'react'

export const ProjectSelector = () => {
  const user = useAuthStore((state) => state.user)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const data = useProjectStore((state) => state.data as ProjectTabletProp)
  const getRelatedProjects = useProjectStore((state) => state.getRelatedProjects)
  //const selectProject = useProjectStore((state) => state.selectedProject);
  const setSelectedProject = useProjectStore((state) => state.getProjects)

  useEffect(() => {
    getRelatedProjects(user?.id || '')
  }, [getRelatedProjects, user?.id])

  useEffect(() => {
    if (data.projects?.length && !selectedProjectId) {
      const firstProjectId = data.projects[0].id
      setSelectedProjectId(firstProjectId)
      setSelectedProject(firstProjectId)
    }
  }, [data.projects, selectedProjectId, setSelectedProject])

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value
    setSelectedProjectId(projectId)
    setSelectedProject(projectId)
  }

  return (
    <div className="w-full lg:max-w-[260px]">
      <select
        id="projectSelector"
        value={selectedProjectId}
        onChange={handleProjectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>
          Selecciona un proyecto
        </option>
        {data.projects.length > 0 &&
          data.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
      </select>
    </div>
  )
}
