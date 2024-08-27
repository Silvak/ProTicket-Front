import type { HistoryProp } from '@/contracts'
import { useAuthStore, useHistoryStore } from '@/store'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCash } from 'react-icons/bs'
import { LuUser2 } from 'react-icons/lu'
import { MdOutlineDashboard } from 'react-icons/md'
import { toast } from 'react-toastify'
import { CustomModal } from '../modal/customModal'

type TabletRow = {
  history: HistoryProp
}

export const HistoryRow = ({ history }: TabletRow) => {
  const deleteHistory = useHistoryStore((state) => state.deleteHistory)
  const user = useAuthStore((state) => state.user)
  const role = user?.role || ''

  const handleDelete = async () => {
    try {
      await deleteHistory(history.id, history.ticket)
      toast.success('Record eliminado exitosamente.')
    } catch (_error) {
      toast.error('Ha ocurrido un error!')
    }
  }

  return (
    <>
      <div className="grid  grid-cols-1 lg:grid-cols-7 border-b p-4 gap-y-2 xl:gap-0">
        {/* note */}
        <div className="flex gap-2 col-span-1 lg:col-span-2 overflow-hidden">
          <div className="flex justify-center items-center h-[64px] w-[64px]  bg-gray-200 rounded-md overflow-hidden">
            <span className="text-4xl">
              <BsCash />
            </span>
          </div>
          <div>
            <h2 className="font-semibold">{history.note || 'Pago'}</h2>
            <p className="text-sm text-gray-400">ID {history.id}</p>
          </div>
        </div>

        {/* payment */}
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 text-white bg-slate-800 rounded-md font-semibold">
            {history.badge} {history.amount}
          </div>
        </div>

        {/* allowance status */}
        <div className="flex justify-center items-center">
          <div className="px-3 py-1 text-white bg-slate-800 rounded-md font-semibold">
            {history.paymentType}
          </div>
        </div>

        {/* state */}
        <div className="flex items-center justify-center">
          <span className="font-s">{history.dolarAmount}</span>$
        </div>

        {/* seller */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full">
            <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
              <LuUser2 />
            </div>
            <p className="min-w">{history.seller.name}</p>
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-end gap-2 col-span-1 lg:col-span-1 mt-6 lg:mt-0">
          <CustomModal
            header={<h2>Actualizar Abono</h2>}
            buttonText=""
            buttonType="update"
            buttonIcon={<MdOutlineDashboard />}
          >
            <p>
              ¿Estás seguro de que deseas eliminar el ticket:
              <span className="font-semibold ml-1">{history.id}</span> de
              <span className="font-semibold ml-1">{history.id}</span>?
            </p>
          </CustomModal>

          {(role[0] === 'USER_ROLE' || role[0] === 'RESELLER_ROLE') && (
            <>
              <CustomModal
                header={<h2>Confirmar Eliminación</h2>}
                buttonText=""
                buttonType="delete"
                buttonIcon={<AiOutlineDelete />}
              >
                <p>
                  ¿Estás seguro de que deseas eliminar el ticket:
                  <span className="font-semibold ml-1">{history.id}</span> de
                  <span className="font-semibold ml-1">{history.id}</span>?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Confirmar
                  </button>
                </div>
              </CustomModal>
            </>
          )}
        </div>
      </div>
    </>
  )
}
