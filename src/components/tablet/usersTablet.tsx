import type { UserTabletProp } from '@/contracts'
import { useUserStore } from '@/store'
import { useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { UserRow } from './userRow'

export const UsersTablet = ({ limit, page, users, total }: UserTabletProp) => {
  const numberPages = Math.ceil(total / limit)
  const actualPage = useUserStore((state) => state.page)
  const actualLimit = useUserStore((state) => state.limit)
  const setPage = useUserStore((state) => state.setPage)
  const setLimit = useUserStore((state) => state.setLimit)
  const getUsers = useUserStore((state) => state.getUser)

  useEffect(() => {
    getUsers()
    actualPage
    actualLimit
  }, [actualPage, actualLimit, getUsers])

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
      <div className="hidden lg:grid grid-cols-5 border-b p-4 text-sm text-gray-400">
        <p className="col-span-2">Proyecto</p>
        <p>Rol</p>
        <p>Estado</p>
        <p className="text-right">Acciones</p>
      </div>

      {/* body */}
      <div>
        {users.map((user) => (
          <UserRow
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            state={user.state}
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
            <option value={2}>2</option>
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
