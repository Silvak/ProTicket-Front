import QRCode from 'qrcode.react'

interface RaffleDisplayProps {
  id: string
  number: string
  qr: string
  price: number
  numberPosition: string
  qrPosition: string
  img: string
}

const positionStyles: Record<string, string> = {
  tl: 'top-2 left-2',
  tr: 'top-2 right-2',
  bl: 'bottom-2 left-2',
  br: 'bottom-2 right-2',
}

export const RaffleDisplay: React.FC<RaffleDisplayProps> = ({
  id,
  number,
  qr,
  price,
  numberPosition,
  qrPosition,
  img,
}) => {
  const fliedList = ['nombre', 'ci', 'telefono', 'direccion', 'otro']

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-1  border rounded-md  p-2">
        {fliedList.map((item) => (
          <div key={item} className="flex  gap-1 items-baseline w-full">
            <input
              type="text"
              className="w-full border-gray-300 border-b text-[12px] px-2 bg-white"
              disabled
              placeholder={item}
            />
          </div>
        ))}
      </div>
      <div className="relative grid w-full border min-h-[500px] rounded-md overflow-hidden">
        <div className="absolute top-0 w-full h-full ">
          <img src={img} alt="Raffle-picture" className="w-full h-full object-cover" />
        </div>

        {/* Raffle Number */}
        <div
          className={`absolute z-20 rounded-md p-1  backdrop-blur-sm bg-white/60  ${positionStyles[numberPosition]}`}
        >
          <p className="text-lg font-bold">{number}</p>
        </div>

        {/* QR Code */}
        <div
          className={`absolute z-10 bg-white border rounded-md p-4 w-[160px]  ${positionStyles[qrPosition]}`}
        >
          <p className="w-full text-center mb-4">
            <span>precio:</span> <span className="text-xl font-semibold">{price}</span>
            <span>$</span>
          </p>
          <QRCode value={`${qr}/${id}`} size={126} />
          <p className="text-[9px] text-gray-800 mt-1 text-center">id-{id}</p>
        </div>
      </div>
    </div>
  )
}
