import { LayoutGrid, Loading, Navbar } from '@/components'
import { useTicketStore } from '@/store'
import QRCode from 'qrcode.react'
import { useEffect } from 'react'
import { LuUser2 } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

const positionStyles: Record<string, string> = {
  tl: 'top-2 left-2',
  tr: 'top-2 right-2',
  bl: 'bottom-2 left-2',
  br: 'bottom-2 right-2',
}

interface TicketProp {
  ownerData: {
    name: string
    dni: string
    phone1: string
    phone2: string
    address: string
    other: string
  }
  seller: {
    name: string
  }
  project: {
    raffleConfig: {
      img: string
      numberPosition: string
      qrPosition: string
    }
  }
  number: string
  id: string
}

export const BuyerTicketPage = () => {
  const { ticketId } = useParams()
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)
  const getTicket = useTicketStore((state) => state.getTicket)

  useEffect(() => {
    getTicket(ticketId || '', true)
  }, [getTicket, ticketId])

  if (!selectedTicket) return <Loading />
  return (
    <>
      <Navbar />
      <LayoutGrid>
        <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
          <h1 className="text-2xl font-semibold">Detalles del Ticket</h1>
        </div>

        {/* info / update */}
        <div className=" bg-white rounded-xl p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4  border border-gray-300 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
              <h4 className="whitespace-nowrap">Info</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-3 gap-1 text-sm">
            <p>
              <strong>Nombre</strong> {selectedTicket.ownerData.name}
            </p>
            <p>
              <strong>CI</strong> {selectedTicket.ownerData.dni}
            </p>
            <p>
              <strong>Teléfono 1</strong> {selectedTicket.ownerData.phone1}
            </p>
            <p>
              <strong>Teléfono 2</strong> {selectedTicket.ownerData.phone1}
            </p>
            <p>
              <strong>Direccion</strong> {selectedTicket.ownerData.address}
            </p>
            <p>
              <strong>Otro </strong> {selectedTicket.ownerData.other}
            </p>
          </div>

          <div className="flex items-center gap-2 py-2 mt-3">
            <p>Vendido por:</p>
            <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full">
              <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
                <LuUser2 />
              </div>
              {/* Add a check to ensure seller and seller.name exist */}
              <p className="min-w text-nowrap">
                {selectedTicket.seller?.name ?? 'Sin vendedor'}
              </p>
            </div>
          </div>

          <div className="relative grid w-full border min-h-[500px] rounded-md overflow-hidden">
            <div className="absolute top-0 w-full h-full ">
              <img
                src={selectedTicket.project?.raffleConfig?.img}
                alt="Raffle-picture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Raffle Number */}
            <div
              className={`absolute z-20 rounded-md p-1  backdrop-blur-sm bg-white/60  ${
                positionStyles[selectedTicket.project.raffleConfig.numberPosition]
              }`}
            >
              <p className="text-lg font-bold">{selectedTicket.number}</p>
            </div>

            {/* QR Code */}
            <div
              className={`absolute z-10 bg-white border rounded-md p-4 w-[160px]  ${
                positionStyles[selectedTicket.project.raffleConfig.qrPosition]
              }`}
            >
              <p className="w-full text-center mb-4">
                <span>precio:</span> <span className="text-xl font-semibold">{}</span>
                <span>$</span>
              </p>
              <QRCode
                value={`${'http:localhost/your-ticket'}/${selectedTicket.id}`}
                size={126}
              />
              <p className="text-[9px] text-gray-800 mt-1 text-center">
                id-{selectedTicket.id}
              </p>
            </div>
          </div>
        </div>
      </LayoutGrid>
    </>
  )
}
