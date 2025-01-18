import type { ProjectProp } from '@/contracts'
import { useUserRole } from '@/hooks'
import { useState } from 'react'
import { MdAdd, MdClear } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface ProjectStatusProp {
  collected: number
  goal: number
  reserved: number
  pending: number
  sold: number
  grid: {
    number: string
    ticket: string
    status: string
    ownerData: {
      name: string
      dni: string
      phone1: string
    }
  }[]
}

interface NumberGridProps {
  projectStatus: ProjectStatusProp
  selectedProject: ProjectProp | null
}

export const NumberGrid = ({ projectStatus, selectedProject }: NumberGridProps) => {
  const navigate = useNavigate()
  const rolePath = useUserRole()
  const [searchQuery, setSearchQuery] = useState('')
  const [newTicket, setNewTicket] = useState<string[]>([])
  //stores

  const filteredTickets = projectStatus?.grid?.filter((ticket) => {
    const { number, ownerData } = ticket
    const query = searchQuery.toLowerCase()
    return (
      number.toLowerCase().includes(query) ||
      ownerData?.dni?.toLowerCase()?.includes(query) ||
      ownerData?.phone1?.toLowerCase()?.includes(query) ||
      ownerData?.name?.toLowerCase()?.includes(query)
    )
  })

  //____________________________________________________________________________________
  const handleTicketClick = (ticketId: string, number: string) => {
    if (ticketId) {
      navigate(`/${rolePath}/ticket/detail/${ticketId}`) // if exist go to details
    } else {
      const maxTickets = selectedProject?.raffleConfig?.perTicket ?? 0
      let newArr = [...newTicket]

      if (newArr.includes(number)) {
        // remove select number
        newArr = newArr.filter((item) => item !== number)
      } else if (newArr.length < maxTickets) {
        // add select number
        newArr.push(number)
      }
      setNewTicket(newArr)
    }
  }

  const handleTicketCreate = () => {
    const ticketNumber = newTicket.join('-')
    // Solo creamos si newTicket.length == maxTickets
    if (newTicket.length === selectedProject?.raffleConfig?.perTicket) {
      navigate(`/${rolePath}/project/detail/${selectedProject?.id}?number=${ticketNumber}`)
    }
  }

  return (
    <>
      <div className="flex flex-col  rounded-xl p-0 mt-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold text-gray-500">
          RIFA SELECCIONADA: <span className="text-gray-900">{selectedProject?.name}</span>
        </h1>
      </div>

      {/* search input */}
      <div className={`bg-white rounded-xl  p-2 col-span-1 sm:col-span-2 ${'md:col-span-6 xl:col-span-12'}`}>
        <input
          type="text"
          placeholder="⌕ Buscar CI, Teléfono, Nombre o Número"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2 outline-none"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-2 py-3 px-3 bg-white rounded-xl  sm:col-span-2 md:col-span-6  xl:col-span-12 ">
        <div className="flex justify-start text-nowrap w-full lg:w-min font-semibold">
          <p>
            Numeros seleccionados{' '}
            <span className="font-mono font-normal">
              [{newTicket.length} de {selectedProject?.raffleConfig?.perTicket}]
            </span>{' '}
            :
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-start items-center w-full min-h-[42px]">
          {newTicket.map((item) => (
            <div key={item} className="flex justify-center items-center border-2 border-green-600 h-[42px] w-[42px]  font-semibold rounded-md">
              {item}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-1 bg-green-500 px-4 py-2 rounded-md text-white font-semibold w-full lg:w-min text-nowrap mt-1 md:mt-0"
          onClick={handleTicketCreate}
        >
          Crear
          <span className="text-2xl">
            <MdAdd />
          </span>
        </button>
      </div>

      <div className="flex flex-col bg-white rounded-xl py-3 px-2 col-span-1 sm:col-span-2 md:col-span-6  xl:col-span-12 min-h-[120px]">
        <div className="flex flex-wrap gap-[2px] p-3 justify-start max-h-[500px] overflow-y-scroll">
          {filteredTickets && filteredTickets.length > 0 ? (
            filteredTickets.map((item) => {
              let statusColor = ''

              switch (item.status) {
                case 'WINNER':
                  statusColor = '#FDE047'
                  break
                case 'PAID':
                  statusColor = '#4ADE80'
                  break
                case 'UNPAID':
                  statusColor = '#FB923C'
                  break
                case 'RESERVED':
                  statusColor = '#60A5FA'
                  break
                case 'CANCELLED':
                  statusColor = '#8E232A'
                  break
                default:
                  statusColor = ''
              }

              return (
                <button
                  key={item.number}
                  type="button"
                  style={{ backgroundColor: statusColor }}
                  onClick={() => handleTicketClick(item.ticket, item.number)}
                  className={`
                    ${newTicket.includes(item.number) ? 'border-2 border-green-500' : ''}
                ${statusColor}
                 relative flex flex-col justify-around items-center min-h-[48px] w-[48px] border rounded-md overflow-hidden bg-gray-50 cursor-pointer text-sm`}
                >
                  {newTicket.includes(item.number) && (
                    <div className="absolute  top-0  right-0 text-lg text-red-600">
                      <MdClear />
                    </div>
                  )}

                  {item.number.split('-').map((num) => (
                    <p key={num} className="text-[14px] font-semibold text-gray-700">
                      {num}
                    </p>
                  ))}
                </button>
              )
            })
          ) : (
            <div className="flex justify-center items-center w-full h-[120px]">No hay tickets</div>
          )}
        </div>
      </div>
    </>
  )
}
