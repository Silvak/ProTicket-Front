import { LayoutGrid, ProjectTablet } from '@/components'
import type { ProjectTabletProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { useEffect, useState } from 'react'

export const ProjectsPage = () => {
  const data = useProjectStore((state) => state.data as ProjectTabletProp)
  const getProjects = useProjectStore((state) => state.getProjects)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getProjects()
  }, [getProjects])

  const filteredProjects = data.projects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!data || !Array.isArray(data.projects)) {
    return <div>Loading...</div>
  }
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">PROYECTOS</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-5 xl:col-span-10">
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2"
        />
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-2">
        CREAR
      </div>

      <ProjectTablet
        limit={data.limit}
        page={data.page}
        projects={filteredProjects || []}
        total={data.total}
      />
    </LayoutGrid>
  )
}
