import type { ProjectTabletProp } from '@/contracts'
//import { useProjectStore } from '@/store'
import type { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { ProjectRow } from './projectRow'

export const ProjectTablet: FC<ProjectTabletProp> = ({
  limit,
  page,
  projects,
  total,
}) => {
  const numberPages = Math.ceil(total / limit)
  //const setPage = useProjectStore((state) => state.setPage);
  //const setLimit = useProjectStore((state) => state.setLimit);

  return (
    <table className="bg-white border border-gray-300 rounded-md col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
      {/* head */}
      <header className="grid grid-cols-7 border-b p-4 text-sm text-gray-400">
        <p className="col-span-2">Proyecto</p>
        <p>Total Tickets</p>
        <p>Price</p>
        <p>Dueño</p>
        <p>Estado</p>
        <p className="text-right">Acciones</p>
      </header>

      {/* body */}
      {projects.map((project) => (
        <ProjectRow
          key={project.id}
          id={project.id}
          name={project.name}
          totalTickets={project.totalTickets}
          state={project.state}
          owner={project.owner}
        />
      ))}

      {/* pagination */}
      <nav className="flex justify-center gap-2 items-center p-4">
        <div className="h-[42px] w-[42px] border flex justify-center items-center rounded-md">
          <IoIosArrowBack />
        </div>
        <div className="h-[42px] w-[42px] border flex justify-center items-center rounded-md">
          {page}
        </div>
        <div className="h-[42px] w-[42px] border flex justify-center items-center rounded-md">
          <IoIosArrowForward />
        </div>
        Paginas: {numberPages}
      </nav>
    </table>
  )
}
