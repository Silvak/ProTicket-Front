import type { TicketTabletProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { useTicketStore } from '@/store/tickets/ticket.store'
import { useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { CreateTicketModal } from '../modal/createTicket.modal'
import { TicketRow } from './ticketRow'

export const TicketsTablet = ({ limit, page, tickets, total }: TicketTabletProp) => {
  const seledProjectId = useProjectStore((state) => state.selectedProject?.id)
  const numberPages = Math.ceil(total / limit)
  const actualPage = useTicketStore((state) => state.page)
  const actualLimit = useTicketStore((state) => state.limit)
  const setPage = useTicketStore((state) => state.setPage)
  const setLimit = useTicketStore((state) => state.setLimit)
  const getTickets = useTicketStore((state) => state.getTickets)

  useEffect(() => {
    getTickets(seledProjectId ?? '')
    actualPage
    actualLimit
  }, [actualPage, actualLimit, getTickets, seledProjectId])

  const handlePrevius = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNext = () => {
    if (page < numberPages) setPage(page + 1)
  }

  return (
    <>
      {/* filter & actions */}
      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-5 xl:col-span-10">
        {/*
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={""}
          onChange={(e) => console.log(e.target.value)}
          className="w-full h-full p-2"
        />
        */}
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[52px] p-2 col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-2">
        <CreateTicketModal />
      </div>

      {/* TABLET */}
      <div className="bg-white border border-gray-300  overflow-hidden rounded-md col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        {tickets.length > 0 ? (
          <>
            {/* head */}
            <div className="hidden lg:grid grid-cols-7 border-b p-4 text-sm text-gray-400">
              <p className="col-span-2">Propietario</p>
              <p className=" text-center">Numero</p>
              <p>Abonado</p>
              <p className=" text-center">Vendido por</p>
              <p className="text-center">Estado</p>
              <p className="text-right">Acciones</p>
            </div>

            {/* rows */}
            <div>
              {tickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
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
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-24 text-gray-500">
            No se encontraron tickets
          </div>
        )}
      </div>
    </>
  )
}
