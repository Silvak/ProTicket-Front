import type { ProjectTabletProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { type FC, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { ProjectRow } from './projectRow'

export const ProjectTablet: FC<ProjectTabletProp> = ({
  limit,
  page,
  projects,
  total,
}) => {
  const numberPages = Math.ceil(total / limit)
  const actualPage = useProjectStore((state) => state.page)
  const actualLimit = useProjectStore((state) => state.limit)
  const setPage = useProjectStore((state) => state.setPage)
  const setLimit = useProjectStore((state) => state.setLimit)
  const getProjects = useProjectStore((state) => state.getProjects)

  useEffect(() => {
    getProjects()
    actualPage
    actualLimit
  }, [actualPage, actualLimit, getProjects])

  const handlePrevius = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNext = () => {
    if (page < numberPages) setPage(page + 1)
  }

  //if (projects.length == 0) return <div> No hay proyectos</div>;
  return (
    <div className="bg-white border border-gray-300  overflow-hidden rounded-md col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
      {/* head */}
      <div className="hidden lg:grid grid-cols-7 border-b p-4 text-sm text-gray-400">
        <p className="col-span-2">Proyecto</p>
        <p>Total Tickets</p>
        <p>Precio</p>
        <p>Dueño</p>
        <p>Estado</p>
        <p className="text-right">Acciones</p>
      </div>

      {/* body */}
      <div>
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            id={project.id}
            name={project.name}
            priceTicket={project.priceTicket}
            totalTickets={project.totalTickets}
            state={project.state}
            owner={project.owner}
          />
        ))}
      </div>

      {/* pagination */}
      <nav className="flex justify-between gap-2 items-center p-4">
        <div className="flex">
          <select
            name="limit"
            id="limit"
            onChange={(e) => {
              setLimit(+e.target.value)
              setPage(1)
            }}
            className="border rounded-md h-[42px] px-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevius}
            className="h-[42px] w-[42px] border flex justify-center items-center rounded-md hover:bg-gray-400"
          >
            <IoIosArrowBack />
          </button>
          <div className="h-[42px] w-[42px] border flex justify-center items-center rounded-md">
            {page}
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="h-[42px] w-[42px] border flex justify-center items-center rounded-md hover:bg-gray-400"
          >
            <IoIosArrowForward />
          </button>
        </div>
        pag. {numberPages}
      </nav>
    </div>
  )
}
