import { LayoutGrid } from '@/components'
import { UpdateTicketForm } from '@/components/form/updateTicket.form'
import type { TicketProp } from '@/contracts'
import { /*useProjectStore,*/ useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const DetailTicketPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>()
  const [loading, setLoading] = useState(true)

  //const project = useProjectStore((state) => state.selectedProject)
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)
  const getTicket = useTicketStore((state) => state.getTicket)

  useEffect(() => {
    const fetchData = async () => {
      if (ticketId !== undefined) {
        await getTicket(ticketId)
        setLoading(false)
      }
    }
    fetchData()
  }, [ticketId, getTicket])

  if (loading) return <div>Loading...</div>
  if (!selectedTicket || !selectedTicket) return <div>Error: No ticket found</div>
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">DETALLES DEL TICKET</h1>
      </div>

      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-6">
        {selectedTicket && <UpdateTicketForm ticket={selectedTicket} />}
      </div>

      {/* ticket view */}
    </LayoutGrid>
  )
}

/*

<div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <RaffleDisplay
          id={project?.id || ""}
          number="0001"
          price={project?.raffleConfig?.priceTicket || 0}
          qr="https://example.com/qr-code.png"
          numberPosition={project?.raffleConfig?.numberPosition}
          qrPosition={project?.raffleConfig?.qrPosition}
          img={
            project?.raffleConfig?.img ||
            "https://www.tarjetasinnovadoras.com/wp-content/uploads/2023/11/BOLETAS-RIFA-4x0-F4.webp"
          }
        />
      </div>

 
      <div className="bg-white border border-gray-300 rounded-md p-4 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        {project && <UpdateProjectForm project={project} />}
      </div>

    
      <div className="bg-white border border-gray-300 rounded-md h-[42px] p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12 mt-8">
        <h1 className="text-xl font-bold">TIKETS</h1>
      </div>

      <TicketsTablet
        projectId={id}
        limit={tickets?.limit}
        page={tickets?.page}
        tickets={tickets?.tickets}
        total={tickets?.total}
      />

*/
