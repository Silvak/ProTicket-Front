import type { ProjectTabletProp } from '@/contracts'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useProjectStore } from '@/store'
import { useEffect, useState } from 'react'
//import { useSocket } from '@/store'

export const ProjectSelector = () => {
  const userRole = useUserRole()
  const [selectedProjectId, setSelectedProjectId] = useState<string>(localStorage.getItem('selectedProjectId') || '')
  const [hasForcedFirstProject, setHasForcedFirstProject] = useState(false)

  //stores
  const user = useAuthStore((state) => state.user)
  const data = useProjectStore((state) => state.data) as ProjectTabletProp
  const setSelectedProject = useProjectStore((state) => state.getProjects)
  const getRelatedProjects = useProjectStore((state) => state.getRelatedProjects)
  const getRelatedProjectReseller = useProjectStore((state) => state.getRelatedProjectReseller)

  useEffect(() => {
    if (user?.id) {
      if (userRole === 'user') {
        getRelatedProjects(user.id)
      } else {
        getRelatedProjectReseller(user.id)
      }
    }
  }, [userRole, user?.id, getRelatedProjects, getRelatedProjectReseller])

  useEffect(() => {
    const projects = data?.projects
    if (!projects?.length) return
    // Checamos si el ID guardado en localStorage está en la lista actual
    const foundInList = projects.some((p) => p.id === selectedProjectId)
    // Si ya forzamos antes y el `selectedProjectId` es válido, no hacemos nada
    if (hasForcedFirstProject && foundInList) {
      return
    }

    // Si no hay ID en localStorage o es inválido, forzamos el primer proyecto
    if (!selectedProjectId || !foundInList) {
      const firstProjectId = projects[0].id
      setSelectedProjectId(firstProjectId)
      setSelectedProject(firstProjectId)
      localStorage.setItem('selectedProjectId', firstProjectId)
    } else {
      // Si hay uno válido, lo seteamos en la store para reflejarlo
      setSelectedProject(selectedProjectId)
    }
    // Marcamos que ya hicimos la "forzada" inicial
    setHasForcedFirstProject(true)
  }, [data?.projects, selectedProjectId, hasForcedFirstProject, setSelectedProject])

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value
    setSelectedProjectId(projectId)
    setSelectedProject(projectId)
    localStorage.setItem('selectedProjectId', projectId)
  }

  return (
    <div className="w-full lg:max-w-[260px]">
      <select
        id="projectSelector"
        value={selectedProjectId}
        onChange={handleProjectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-slate-950 focus:border-slate-950 sm:text-sm rounded-xl h-[52px]"
      >
        <option value="" disabled>
          Selecciona un proyecto
        </option>
        {data?.projects?.length > 0 ? (
          data.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))
        ) : (
          <option disabled>No hay proyectos disponibles</option>
        )}
      </select>
    </div>
  )
}

/*
  const { socket } = useSocket()
  const _joinRoom = (projectId: string) => {
    if (socket) {
      socket.emit('joinProjectRoom', { projectId })
      //console.log(`Evento JoinProject enviado: ${projectId}`)
    }
  }*/
