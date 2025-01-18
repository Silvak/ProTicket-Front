import { ErrorBox, HistoryTablet, LayoutGrid, Loading } from '@/components'
import { CustomModal } from '@/components'
import { UpdateTicketForm } from '@/components/form/updateTicket.form'
import type { TicketProp } from '@/contracts'
import type { HistoryTabletProp } from '@/contracts'
import { useModalAutoClose } from '@/hooks'
import { useHistoryStore, useProjectStore, useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { FaRegCopy } from 'react-icons/fa6'
import { IoMdShare } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { LuUser2 } from 'react-icons/lu'
import PhoneInput from 'react-phone-input-2'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
//import { FaLongArrowAltRight } from 'react-icons/fa'

export const convertToDateFormat = (dateString: string) => {
  const dateObject = new Date(dateString)

  // get year, month, and day
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0') // months are zero-based
  const day = String(dateObject.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const DetailTicketPage = () => {
  const navigate = useNavigate()
  const { ticketId } = useParams<{ ticketId: string }>()
  const { isOpen, modalAutoClose } = useModalAutoClose()
  const [loading, setLoading] = useState(true)
  const selectedProject = useProjectStore((state) => state.selectedProject)
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)
  const { history } = useHistoryStore((state) => state.data as HistoryTabletProp)
  const getTicket = useTicketStore((state) => state.getTicket)

  const received = history?.reduce((acc, item) => acc + (+item.dolarAmount || 0), 0) || 0

  useEffect(() => {
    if (ticketId) {
      getTicket(ticketId).finally(() => setLoading(false))
    }
  }, [ticketId, getTicket])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (ticketId) {
      getTicket(ticketId).finally(() => setLoading(false))
    }
    received
  }, [ticketId, getTicket, received])

  const handleCopyLink = () => {
    const url = `https://proticket.app/your-ticket/${ticketId}`
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Enlace copiado al portapapeles')
    })
  }

  const handleShareLink = async () => {
    const url = `https://proticket.app/your-ticket/${ticketId}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Detalles del Ticket',
          text: 'Mira los detalles de este ticket',
          url,
        })
      } catch (error) {
        console.error('Error al compartir', error)
      }
    } else {
      alert('La funcionalidad de compartir no es compatible con este navegador')
    }
  }

  if (loading) return <Loading />
  if (!selectedTicket || !selectedTicket) return <ErrorBox title={'Error'} message={'No se ha logrado obtener la data.'} />
  return (
    <LayoutGrid>
      <div className="flex flex-col lg:flex-row lg:justify-between rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <div className="flex flex-row items-center rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
          <button type="button" className="text-xl mt-1 mr-2 hover:text-blue-600" onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </button>
          <h1 className="text-2xl font-semibold">Detalles del Ticket</h1>
        </div>

        <div className="flex items-start gap-3 mt-2">
          <button
            type="button"
            onClick={handleShareLink}
            className="flex items-center justify-center text-nowrap gap-1 bg-blue-500 text-white px-3 py-2 rounded-md w-full"
          >
            <IoMdShare /> Compartir enlace
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center justify-center text-nowrap gap-1 bg-gray-500 text-white px-3 py-2 rounded-md w-full"
          >
            <FaRegCopy /> Copiar enlace
          </button>
        </div>
      </div>

      {/* info / update */}
      <div className="bg-white rounded-xl p-2 col-span-1 row-span-2 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Información</h4>
          </div>

          <div className="">
            <div className="flex items-center border p-1 px-3 font-semibold rounded-sm h-[38px]">Nº {selectedTicket.number.replace(/-/g, ' ‧ ')}</div>
          </div>
        </div>

        <div className="flex flex-col justify-start w-full gap-2 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-[80px]">Número/s</label>
            <input
              type="text"
              name="name"
              value={selectedTicket.number.replace(/-/g, '-')}
              className="w-full  p-2 border border-gray-300 rounded font-semibold"
              disabled
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-[80px]">Nombre</label>
            <input type="text" name="name" value={selectedTicket.ownerData.name} className="w-full  p-2 border border-gray-300 rounded" disabled />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-[80px]">CI - DNI</label>
            <input type="text" name="dni" value={selectedTicket.ownerData.dni} className="w-full  p-2 border border-gray-300 rounded" disabled />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center w-full gap-2">
              <label className="text-sm font-medium w-[80px]">Telf 1</label>
              <div className="w-full">
                <PhoneInput
                  country={'ve'}
                  value={selectedTicket.ownerData.phone1}
                  inputClass="phoneInput"
                  inputProps={{
                    name: 'phone1',
                  }}
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center w-full gap-2">
              <label className="text-sm font-medium w-[80px]">Telf 2</label>
              <div className="w-full">
                <PhoneInput
                  country={'ve'}
                  value={selectedTicket.ownerData.phone2}
                  inputClass="phoneInput"
                  inputProps={{
                    name: 'phone2',
                  }}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-start">
            <label className="text-sm font-medium w-[80px]">Dirección</label>
            <input type="text" name="address" value={selectedTicket.ownerData.address} className="w-full p-2 border border-gray-300 rounded" disabled />
          </div>

          <div className="flex gap-2 items-center justify-start">
            <label className=" text-sm font-medium w-[80px]">Otro</label>
            <input type="textarea" name="other" value={selectedTicket.ownerData.other} className="w-full p-2 border border-gray-300 rounded" disabled />
          </div>
        </div>

        <div className="h-[38px] mt-6">
          <CustomModal
            header={<h2 className="text-xl font-semibold">Detalles Ticket</h2>}
            buttonText="Actualizar"
            buttonType="update"
            buttonIcon={<FaSave />}
            autoClose={isOpen}
          >
            {selectedTicket && <UpdateTicketForm ticket={selectedTicket} modalAutoClose={modalAutoClose} />}
          </CustomModal>
        </div>
      </div>

      {/*  */}

      {/* payments state */}
      <div className="flex flex-col justify-between bg-white rounded-xl p-2 col-span-1 row-span-2 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Pagos</h4>
          </div>

          <div className="flex items-center justify-center">
            {selectedTicket.state === 'WINNER' && (
              <div className="bg-yellow-300/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">GANADOR</p>
              </div>
            )}

            {selectedTicket.state === 'RESERVED' && (
              <div className="bg-blue-300/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">APARTADO</p>
              </div>
            )}

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
          <p className="text-right font-semibold">{selectedProject?.raffleConfig.priceTicket || 0}$</p>

          <p>Abonado</p>
          <p className="text-right font-semibold text-gray-500">- {received}$</p>
        </div>

        <div className="grid grid-cols-2 w-full border-t  bg-gray-200 rounded-md p-2 mt-6 font-semibold">
          <p>Deuda</p>
          <p className="text-right ">{((selectedProject?.raffleConfig.priceTicket || 0) - received).toFixed(2)}$</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-white rounded-xl p-2 col-span-1 row-span-2 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="border p-2 h-[50%] rounded-md">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Vendedor</h4>
          </div>

          <div className="flex items-start gap-2 mt-3">
            <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-md bg-white">
              <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
                <LuUser2 />
              </div>
              {/* Add a check to ensure seller and seller.name exist */}
              <p className="min-w text-nowrap">{selectedTicket.seller?.name ?? 'Sin vendedor'}</p>
            </div>
          </div>
        </div>

        <div className="border p-2 h-[60%] rounded-md">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm ">
            <h4 className="whitespace-nowrap">Fecha limite</h4>
          </div>

          <div className="flex items-center mt-2 gap-2">
            <div className="w-full">
              <label className="text-sm font-medium">Inicio</label>
              <input
                type="date"
                value={convertToDateFormat(selectedTicket.date)}
                className="bg-inherit h-[40px] border px-2 rounded-md bg-slate-100 w-full"
                disabled
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium">Fin</label>
              <input type="date" value={selectedProject?.date.end} className="bg-inherit h-[40px] border px-2 rounded-md bg-slate-100 w-full" disabled />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h2 className="text-2xl font-semibold">Historial de pagos</h2>
      </div>

      <HistoryTablet ticketId={ticketId} />
    </LayoutGrid>
  )
}
