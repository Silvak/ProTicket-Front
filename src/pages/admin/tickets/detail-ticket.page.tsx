import { ErrorBox, HistoryTablet, LayoutGrid } from '@/components'
import { CustomModal } from '@/components'
import { UpdateTicketForm } from '@/components/form/updateTicket.form'
import type { TicketProp } from '@/contracts'
import { useProjectStore, useTicketStore } from '@/store'
import { FaLongArrowAltRight, FaSave } from 'react-icons/fa'
import { LuUser2 } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

export const DetailTicketPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>()
  const selectedProject = useProjectStore((state) => state.selectedProject)
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)

  if (!selectedTicket || !selectedTicket)
    return <ErrorBox title={'Error'} message={'No se ha logrado obtener la data.'} />
  return (
    <LayoutGrid>
      <div className="bg-white border border-gray-300 rounded-md p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-xl font-bold">DETALLES DEL TICKET</h1>
      </div>

      {/* info / update */}
      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Info</h4>
          </div>

          <div className="h-[38px]">
            <CustomModal
              header={<h2 className="text-xl font-semibold">Actualizar Ticket</h2>}
              buttonText="Actualizar"
              buttonType="update"
              buttonIcon={<FaSave />}
            >
              {selectedTicket && <UpdateTicketForm ticket={selectedTicket} />}
            </CustomModal>
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
            <p className="min-w">{selectedTicket.seller.name}</p>
          </div>
        </div>
      </div>

      {/* payments state */}
      <div className="flex flex-col justify-between bg-white border border-gray-300 rounded-md p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Pagos</h4>
          </div>

          <div className="flex items-center justify-center">
            {selectedTicket.state === 'PAID' && (
              <div className="bg-green-600/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">PAGADO</p>
              </div>
            )}

            {selectedTicket.state === 'UNPAID' && (
              <div className="bg-orange-300/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">PENDIENTE</p>
              </div>
            )}

            {selectedTicket.state === 'CANCELLED' && (
              <div className="bg-red-500/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">CANCELADO</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 w-full mt-8 gap-2 px-2">
          <p>Precio Ticket</p>
          <p className="text-right font-semibold">
            {selectedProject?.raffleConfig.priceTicket || 0}$
          </p>

          <p>Abonado</p>
          <p className="text-right font-semibold text-gray-500">- 5$</p>
        </div>

        <div className="grid grid-cols-2 w-full border-t  bg-gray-200 rounded-md p-2 mt-6 font-semibold">
          <p>Deuda</p>
          <p className="text-right ">15$</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Fecha limite</h4>
        </div>

        <p className="border py-1 px-2 bg-slate-100 rounded-sm mt-3">
          {selectedTicket.date}{' '}
          <span>
            <FaLongArrowAltRight />
          </span>{' '}
          {selectedProject?.date.end}
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-md  p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Historial de pagos</h4>
        </div>
      </div>

      <HistoryTablet ticketId={ticketId} />
    </LayoutGrid>
  )
}
