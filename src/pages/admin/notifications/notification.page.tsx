import { LayoutGrid } from '@/components'
import { useMessageStore, useSocket } from '@/store'
import QRCode from 'react-qr-code'
import { useEffect } from 'react'

export const NotificationPage = () => {
  //const [status, setStatus] = useState('')
  //const [qr, setQr] = useState('')
  const wsDisconnect = useMessageStore((state) => state.wsDisconnect)
  const setData = useMessageStore((state) => state.setData)
  const status = useMessageStore((state) => state.status)
  const qr = useMessageStore((state) => state.qr)
  const { socket } = useSocket()

  const handleDisconnect = () => {
    wsDisconnect()
  }

  useEffect(() => {
    if (socket) {
      socket.on('whatsapp-qr', (data) => {
        setData(data.status, data.qr)
        //setData(data.status, data.qr)
      })
    }
  }, [socket, setData])

  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Notificaciones Mainhub</h1>
      </div>

      <article className="flex flex-col gap-2 bg-white rounded-xl py-3 px-2 col-span-1 sm:col-span-2 md:col-span-6  xl:col-span-12 min-h-[120px]">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h2 className="whitespace-nowrap">Whatsapp QR</h2>
          </div>

          <div className="text-sm">
            {status === 'linkup' && (
              <div style={{ backgroundColor: '#f1cd57' }} className="px-2 py-1 rounded-full">
                No conectado
              </div>
            )}
            {status === 'connected' && (
              <div style={{ backgroundColor: '#79d176' }} className="px-2 py-1 rounded-full">
                Conectado
              </div>
            )}
            {status === 'disconnecte' && (
              <div style={{ backgroundColor: '#ea635a' }} className="px-2 py-1 rounded-full">
                Desconectado
              </div>
            )}
          </div>
        </div>

        <div className=" flex flex-col items-center mt-4">
          <div className="relative p-4 border rounded-md h-[332px] overflow-hidden">
            <QRCode value={qr || ''} size={300} />
            {status === 'connected' && <QRCode value={''} size={300} />}

            {status === 'connected' && (
              <div className="absolute flex justify-center items-center top-0 left-0 w-full h-[332px] bg-slate-50/80 backdrop-blur-sm">
                <button type="button" onClick={handleDisconnect} className="bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-md text-white ">
                  Desconectar
                </button>
              </div>
            )}
          </div>

          <div className="h-[28px]">{status === 'linkup' && <p className="mt-1 text-sm">Escanea el código QR para vincular tu cuenta</p>}</div>
        </div>
      </article>
    </LayoutGrid>
  )
}
